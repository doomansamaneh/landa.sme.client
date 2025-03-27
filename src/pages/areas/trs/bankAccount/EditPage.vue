<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Trs_BankAccount_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/trs/bankAccount/shared/forms/CreateFormContainer.vue";
</script>
