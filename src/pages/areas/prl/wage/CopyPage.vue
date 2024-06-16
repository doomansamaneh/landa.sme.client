<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') +
      ' ' +
      $t('main-menu-items.Prl_Wage_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/prl/wage/shared/forms/CreateForm.vue";
</script>
