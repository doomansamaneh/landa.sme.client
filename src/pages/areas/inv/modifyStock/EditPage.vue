<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Inv_ModifyStock_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/inv/modifyStock/shared/forms/CreateForm.vue";
</script>
