<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Acc_AccountCL_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/acc/accountCL/shared/forms/CreateForm.vue";
</script>
