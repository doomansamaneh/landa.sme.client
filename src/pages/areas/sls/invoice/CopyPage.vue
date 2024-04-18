<template>
  <desktop
    action="create"
    method="copy"
    :title="
      $t('shared.labels.copy') + ' ' + $t('main-menu-items.Sls_Invoice_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/sls/invoice/shared/forms/CreateForm.vue";
</script>
