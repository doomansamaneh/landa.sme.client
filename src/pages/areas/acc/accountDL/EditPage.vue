<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Acc_AccountDL_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/acc/accountDL/shared/forms/EditForm.vue";
</script>
