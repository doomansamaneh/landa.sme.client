<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Trs_Payment_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/trs/payment/shared/forms/CreateForm.vue";
</script>
