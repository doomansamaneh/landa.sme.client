<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Inv_Inventory_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/inv/inventory/shared/forms/CreateForm.vue";
</script>
