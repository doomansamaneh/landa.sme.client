<template>
  <preview
    toolbar
    :title="
      $t('shared.labels.preview') +
      ' ' +
      $t('main-menu-items.Sls_PurchaseReturn_View')
    "
  />
</template>

<script setup>
  import Preview from "components/areas/sls/purchaseReturn/shared/preview/IndexView.vue";
</script>
