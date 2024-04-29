<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Trs_TransferMoney_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/trs/transferMoney/shared/forms/CreateForm.vue";
</script>
