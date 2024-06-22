<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') +
      ' ' +
      $t('main-menu-items.Inv_OpeningStock_View')
    "
  />
</template>

<script setup>
  import Desktop from "components/areas/inv/openingStock/shared/forms/CreateForm.vue";
</script>
