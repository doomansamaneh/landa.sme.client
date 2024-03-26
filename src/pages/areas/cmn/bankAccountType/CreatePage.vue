<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Cmn_BankAccountType_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/bankAccountType/shared/forms/CreateForm.vue";
</script>
