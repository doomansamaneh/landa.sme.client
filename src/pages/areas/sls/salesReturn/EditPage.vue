<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Sls_SalesReturn_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/sls/salesReturn/shared/forms/CreateForm.vue";
</script>
