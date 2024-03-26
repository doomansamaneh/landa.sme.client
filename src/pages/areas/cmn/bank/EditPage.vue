<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Cmn_Bank_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/bank/shared/forms/CreateForm.vue";
</script>
