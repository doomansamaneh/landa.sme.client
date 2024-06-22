<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Inv_Reposition_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/inv/reposition/shared/forms/CreateForm.vue";
</script>
