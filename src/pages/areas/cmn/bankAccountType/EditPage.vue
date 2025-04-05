<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Cmn_BankAccountType_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/cmn/bankAccountType/shared/forms/CreateForm.vue";
</script>
