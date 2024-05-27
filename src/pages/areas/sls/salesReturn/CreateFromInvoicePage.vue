<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Sls_SalesReturn_View')
    "
    method="createFromInvoice"
  />
</template>

<script setup>
  import Desktop from "src/components/areas/sls/salesReturn/shared/forms/CreateForm.vue";
</script>
