<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Inv_Production_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/inv/production/shared/forms/CreateForm.vue";
</script>
