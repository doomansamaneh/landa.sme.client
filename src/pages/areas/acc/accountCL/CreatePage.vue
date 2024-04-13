<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Acc_AccountCL_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/acc/accountCL/shared/forms/CreateForm.vue";
</script>
