<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Inv_CloseOrder_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/inv/closeOrder/shared/forms/CreateForm.vue";
</script>
