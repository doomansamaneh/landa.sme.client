<template>
  <preview
    :title="invoiceTitle ?? title ?? $t('shared.labels.invoice')"
    base-route="sls/invoice"
    detail-url="trs/receipt"
    tax-api
    show-sale-header
    show-receipt
  >
    <!-- <template #toolbar-custom-desktop="{ model }"></template>
    <template #toolbar-custom-mobile="{ model }"></template> -->
  </preview>
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  import Preview from "../../../_shared/invoice/shared/preview/IndexView.vue";

  const props = defineProps({
    title: String,
  });

  const appConfigStore = useAppConfigModel();
  const invoiceTitle =
    appConfigStore.model.value?.companySetting?.invoiceTitle;
</script>
