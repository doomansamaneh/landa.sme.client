<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Acc_AccountSL_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/acc/accountSL/shared/forms/CreateFormContainer.vue";
</script>
