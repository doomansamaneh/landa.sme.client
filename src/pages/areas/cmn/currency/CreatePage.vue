<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') + ' ' + $t('main-menu-items.Cmn_Currency_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/currency/shared/forms/CreateForm.vue";
</script>
