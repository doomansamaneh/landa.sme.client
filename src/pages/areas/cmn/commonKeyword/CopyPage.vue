<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') +
      ' ' +
      $t('main-menu-items.Cmn_CommonKeyword_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/commonKeyword/shared/forms/CreateForm.vue";
</script>
