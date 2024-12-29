<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Trs_BankAccount_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/trs/bankAccount/shared/forms/CreateFormContainer.vue";
</script>
