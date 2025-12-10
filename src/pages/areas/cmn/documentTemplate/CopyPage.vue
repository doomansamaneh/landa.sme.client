<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') +
      ' ' +
      $t('main-menu-items.Cmn_DocumentTemplate_View')
    "
  />
</template>

<script setup>
  import Desktop from "components/areas/cmn/documentTemplate/shared/forms/CreateForm.vue";
</script>
