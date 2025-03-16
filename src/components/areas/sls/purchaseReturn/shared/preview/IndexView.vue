<template>
  <preview
    :title="title ?? $t('shared.labels.purchaseReturn')"
    base-route="sls/purchaseReturn"
    entity-name="Sls.[Invoice]"
    detail-url="trs/receipt"
    show-sale-header
    tax-api
  />
</template>

<script setup>
  import Preview from "../../../_shared/invoice/shared/preview/IndexView.vue";
</script>
