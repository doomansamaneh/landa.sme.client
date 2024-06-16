<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Prl_Wage_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/prl/wage/shared/forms/CreateForm.vue";
</script>
