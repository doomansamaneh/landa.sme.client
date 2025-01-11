<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') +
      ' ' +
      $t('main-menu-items.Acc_AccountDL_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/acc/accountDL/shared/forms/CreateForm.vue";
</script>
