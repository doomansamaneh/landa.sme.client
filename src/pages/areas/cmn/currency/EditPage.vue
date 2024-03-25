<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Cmn_Currency_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/currency/shared/forms/CreateForm.vue";
</script>
