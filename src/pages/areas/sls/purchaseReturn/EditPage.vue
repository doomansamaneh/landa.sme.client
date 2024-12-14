<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Sls_PurchaseReturn_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/sls/purchaseReturn/shared/forms/CreateForm.vue";
</script>
