<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Trs_Receipt_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/trs/receipt/shared/forms/CreateForm.vue";
</script>
