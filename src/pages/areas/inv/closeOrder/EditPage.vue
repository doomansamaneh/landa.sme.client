<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Inv_CloseOrder_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/inv/closeOrder/shared/forms/CreateForm.vue";
</script>
