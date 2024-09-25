<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Sls_Quote_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/sls/quote/shared/forms/CreateFormV2.vue";
</script>
