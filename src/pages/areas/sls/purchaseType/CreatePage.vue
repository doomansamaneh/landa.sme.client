<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Sls_PurchaseType_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/sls/purchaseType/shared/forms/CreateForm.vue";
</script>
