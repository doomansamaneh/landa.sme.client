<template>
  <preview
    :title="title ?? $t('shared.labels.purchase')"
    base-route="sls/purchase"
    entity-name="Sls.[Purchase]"
    detail-url="trs/payment"
  />
</template>

<script setup>
  import Preview from "../../../_shared/invoice/shared/preview/IndexView.vue";
</script>
