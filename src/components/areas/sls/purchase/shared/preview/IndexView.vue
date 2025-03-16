<template>
  <preview
    :title="title ?? $t('shared.labels.purchase')"
    base-route="sls/purchase"
    detail-url="trs/payment"
    entity-name="Sls.[Invoice]"
  />
</template>

<script setup>
  import Preview from "../../../_shared/invoice/shared/preview/IndexView.vue";
</script>
