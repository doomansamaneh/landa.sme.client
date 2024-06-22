<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Inv_ModifyStock_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/inv/modifyStock/shared/forms/CreateForm.vue";
</script>
