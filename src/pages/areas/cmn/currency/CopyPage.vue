<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') + ' ' + $t('main-menu-items.Cmn_Currency_View')
    "
  />
</template>

<script setup>
import Desktop from "components/areas/cmn/currency/shared/forms/CreateForm.vue";
</script>
