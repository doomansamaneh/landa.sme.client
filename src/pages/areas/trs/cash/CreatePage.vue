<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Trs_Cash_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/trs/cash/shared/forms/CreateFormContainer.vue";
</script>
