<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Inv_OpeningStock_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/inv/openingStock/shared/forms/CreateForm.vue";
</script>
