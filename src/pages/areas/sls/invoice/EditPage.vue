<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Sls_Invoice_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/sls/invoice/shared/forms/CreateForm.vue";
</script>
