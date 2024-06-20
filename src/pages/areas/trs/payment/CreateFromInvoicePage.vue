<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Trs_Payment_View')
    "
    method="createFromInvoice"
  />
</template>

<script setup>
  import Desktop from "src/components/areas/trs/payment/shared/forms/CreateForm.vue";
</script>
