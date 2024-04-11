<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Doc_Contract_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/doc/contract/shared/forms/CreateForm.vue";
</script>
