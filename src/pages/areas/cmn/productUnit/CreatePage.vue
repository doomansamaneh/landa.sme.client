<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Cmn_ProductUnit_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/productUnit/shared/forms/CreateForm.vue";
</script>
