<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Cmn_DocumentTemplate_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/cmn/documentTemplate/shared/forms/CreateForm.vue";
</script>
