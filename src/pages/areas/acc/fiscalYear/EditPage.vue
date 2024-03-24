<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Acc_FiscalYear_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/acc/fiscalYear/shared/forms/CreateForm.vue";
</script>
