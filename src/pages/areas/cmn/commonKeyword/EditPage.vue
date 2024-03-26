<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Cmn_CommonKeyword_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/commonKeyword/shared/forms/CreateForm.vue";
</script>
