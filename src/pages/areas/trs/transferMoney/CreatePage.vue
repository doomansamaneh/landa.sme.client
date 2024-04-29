<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Trs_TransferMoney_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/trs/transferMoney/shared/forms/CreateForm.vue";
</script>
