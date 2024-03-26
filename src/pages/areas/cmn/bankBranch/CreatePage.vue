<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Cmn_BankBranch_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/bankBranch/shared/forms/CreateForm.vue";
</script>
