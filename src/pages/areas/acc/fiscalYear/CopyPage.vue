<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') + ' ' + $t('main-menu-items.Acc_FiscalYear_View')
    "
  />
</template>

<script setup>
import Desktop from "components/areas/acc/fiscalYear/shared/forms/CreateForm.vue";
</script>
