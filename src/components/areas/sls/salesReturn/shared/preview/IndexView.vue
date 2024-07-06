<template>
  <preview
    :title="title ?? $t('shared.labels.salesReturn')"
    base-route="sls/salesReturn"
    tax-api
    detail-url="trs/payment"
  />
</template>

<script setup>
  import Preview from "../../../_shared/invoice/shared/preview/IndexView.vue";
</script>
