<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Trs_Receipt_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/trs/receipt/shared/forms/CreateForm.vue";
</script>
