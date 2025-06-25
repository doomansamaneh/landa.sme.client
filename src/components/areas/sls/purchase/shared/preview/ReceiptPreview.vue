<template>
  <toolbar-mobile
    v-if="$q.screen.xs"
    :title="title"
    :menu-items="menuItems"
    margin
    back-button
  />
  <toolbar-desktop
    v-else
    :title="title"
    :menu-items="menuItems"
    margin
    back-button
  />

  <q-card bordered>
    <q-inner-loading :showing="loading" class="text-center q-pa-md">
      <q-spinner color="primary" size="2em" />
    </q-inner-loading>
    <pre></pre>
    <div :ref="printStore.printRef">
      <header-section :title="title" :model="model" />
      <body-section :model="model" />
      <footer-section
        :comment="comment"
        :show-signature="showSignature"
        :signature-source="signatureSource"
      />
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { helper } from "src/helpers";
  import { useRoute } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";
  import { usePrint } from "src/composables/usePrint";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useReceiptPreviewMenu } from "../../../_menus/useReceiptPreviewMenu";

  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";
  import ToolbarMobile from "src/components/shared/toolbars/MobilePreviewToolbar.vue";
  import HeaderSection from "./HeaderSection.vue";
  import BodySection from "./BodySection.vue";
  import FooterSection from "./FooterSection.vue";

  const props = defineProps({
    title: String,
    item: Object,
    comment: String,
    showSignature: Boolean,
    signatureSource: String,
  });

  const printStore = usePrint();
  const route = useRoute();
  const model = ref(null);
  const loading = ref(true);
  const error = ref(null);
  const crudStore = useFormActions("sls/purchase", model, true);

  const id = computed(() => props.item?.id ?? route.params.id);

  const calculateTotals = () => {
    model.value.entityName = props.entityName;
    model.value.totalPrice = helper.getSubtotal(
      model.value.invoiceItems,
      "totalPrice"
    );
    model.value.totalDiscount = helper.getSubtotal(
      model.value.invoiceItems,
      "discount"
    );
    model.value.totalVat = helper.getSubtotal(
      model.value.invoiceItems,
      "vatAmount"
    );
    model.value.totalNetPrice =
      model.value.totalPrice +
      model.value.totalDiscount -
      model.value.totalVat;
  };

  const context = usePreviewMenuContext(model.value);
  const menuItems = computed(() =>
    useReceiptPreviewMenu(context.value)
  );

  onMounted(async () => {
    try {
      loading.value = true;
      error.value = null;
      await crudStore.getPreviewById(id.value);
      calculateTotals();
    } catch (err) {
      error.value = err;
      console.error("Failed to load invoice data:", err);
    } finally {
      loading.value = false;
    }
  });
</script>
