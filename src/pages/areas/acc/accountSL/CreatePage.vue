<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Acc_AccountSL_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/acc/accountSL/shared/forms/CreateForm.vue";
</script>
