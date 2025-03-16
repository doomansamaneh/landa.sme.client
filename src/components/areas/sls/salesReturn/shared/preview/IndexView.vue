<template>
  <preview
    :title="title ?? $t('shared.labels.salesReturn')"
    base-route="sls/salesReturn"
    entity-name="Sls.[Invoice]"
    detail-url="trs/payment"
    show-sale-header
    tax-api
  />
</template>

<script setup>
  import Preview from "../../../_shared/invoice/shared/preview/IndexView.vue";
</script>
