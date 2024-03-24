<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Acc_FiscalYear_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/acc/fiscalYear/shared/forms/CreateForm.vue";
</script>
