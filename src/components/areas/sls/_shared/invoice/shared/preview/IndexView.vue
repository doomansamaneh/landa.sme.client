<template>
  <tool-bar
    :inside="inside"
    :title="title"
    :base-route="baseRoute"
    :model="model"
  >
    <template #toolbar-custom>
      <slot name="toolbar-custom" :model="model"></slot>
    </template>
  </tool-bar>

  <mobile
    v-if="$q.screen.xs"
    class="q-mb-sm"
    :model="model"
    :detail-url="detailUrl"
    :show-sale-header="showSaleHeader"
    :tax-api="taxApi"
    :show-receipt="showReceipt"
  >
    <template #master-section>
      <slot name="master-section" :model="model"></slot>
    </template>

    <template #detail-section>
      <slot name="detail-section" :model="model"></slot>
    </template>
  </mobile>

  <desktop
    v-else
    :title="title"
    :model="model"
    :show-sale-header="showSaleHeader"
    :tax-api="taxApi"
    :detail-url="detailUrl"
    :show-receipt="showReceipt"
  >
    <template #master-section>
      <slot name="master-section" :model="model"></slot>
    </template>

    <template #detail-section>
      <slot name="detail-section" :model="model"></slot>
    </template>
  </desktop>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolBar from "./ToolBar.vue";
  import Mobile from "../../mobile/preview/IndexView.vue";
  import Desktop from "../../desktop/preview/IndexView.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
    detailUrl: String,
    showSaleHeader: Boolean,
    showReceipt: Boolean,
    taxApi: Boolean,
  });

  const route = useRoute();
  const id = computed(() => props.item?.id ?? route.params.id);
  const model = ref({});
  const crudStore = useFormActions(props.baseRoute, model);

  const calculateTotals = () => {
    model.value.entityName = "Doc.[Document]";
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
    await crudStore.getPreviewById(id.value);
    calculateTotals();
  });
</script>
