<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Inv_Production_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/inv/production/shared/forms/CreateForm.vue";
</script>
