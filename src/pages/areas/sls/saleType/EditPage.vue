<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Sls_SaleType_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/sls/saleType/shared/forms/CreateForm.vue";
</script>
