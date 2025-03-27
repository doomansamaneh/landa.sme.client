<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Cmn_BankBranch_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/cmn/bankBranch/shared/forms/CreateFormContainer.vue";
</script>
