<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') +
      ' ' +
      $t('main-menu-items.Inv_Reposition_View')
    "
  />
</template>

<script setup>
  import Desktop from "components/areas/inv/reposition/shared/forms/CreateForm.vue";
</script>
