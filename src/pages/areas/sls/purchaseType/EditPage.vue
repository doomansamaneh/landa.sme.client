<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Sls_PurchaseType_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/sls/purchaseType/shared/forms/CreateForm.vue";
</script>
