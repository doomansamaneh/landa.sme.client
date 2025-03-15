<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Sls_Purchase_View')
    "
    method="createFromInvoice"
  />
</template>

<script setup>
  import Desktop from "src/components/areas/sls/purchase/shared/forms/CreateForm.vue";
</script>
