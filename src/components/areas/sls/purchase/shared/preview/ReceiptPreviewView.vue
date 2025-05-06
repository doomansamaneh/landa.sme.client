<template>
  <toolbar-mobile
    v-if="$q.screen.xs"
    buttons
    margin
    :title="title"
    back-button
  >
    <template #buttons>
      <menu-button-print
        class="primary-gradient primary-shadow text-white text-body2"
        @click="printStore.handlePrint()"
      />
    </template>
  </toolbar-mobile>

  <toolbar-desktop v-else buttons margin :title="title" back-button>
    <template #buttons>
      <menu-button-print
        class="primary-gradient primary-shadow text-white text-body2"
        @click="printStore.handlePrint()"
      />
    </template>
  </toolbar-desktop>

  <q-card bordered>
    <q-inner-loading :showing="loading" class="text-center q-pa-md">
      <q-spinner color="primary" size="2em" />
    </q-inner-loading>

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
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";
  import { usePrint } from "src/composables/usePrint";
  import { numberToWords } from "@persian-tools/persian-tools";

  import ToolbarDesktop from "src/components/shared/ToolBarDesktop.vue";
  import ToolbarMobile from "src/components/shared/ToolBarPreviewMobile.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";
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

  const appConfigStore = useAppConfigModel();
  const printStore = usePrint();
  const route = useRoute();
  const model = ref(null);
  const loading = ref(true);
  const error = ref(null);
  const crudStore = useFormActions("sls/purchase", model);

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

  onMounted(async () => {
    try {
      loading.value = true;
      error.value = null;
      await await crudStore.getPreviewById(id.value);
      calculateTotals();
    } catch (err) {
      error.value = err;
      console.error("Failed to load invoice data:", err);
    } finally {
      loading.value = false;
    }
  });
</script>
