<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Cmn_ProductUnit_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/productUnit/shared/forms/CreateForm.vue";
</script>
