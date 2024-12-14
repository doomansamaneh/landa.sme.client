<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Sls_PruchaseReturn_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/sls/purchaseReturn/shared/forms/CreateFormV2.vue";
</script>
