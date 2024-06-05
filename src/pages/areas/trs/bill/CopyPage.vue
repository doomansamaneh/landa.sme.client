<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') +
      ' ' +
      $t('main-menu-items.Trs_Bill_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/trs/bill/shared/forms/CreateForm.vue";
</script>
