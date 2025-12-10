<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Cmn_DocumentTemplate_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/cmn/documentTemplate/shared/forms/CreateForm.vue";
</script>
