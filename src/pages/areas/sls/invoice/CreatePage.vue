<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Sls_Invoice_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/sls/invoice/shared/forms/CreateForm.vue";
</script>
