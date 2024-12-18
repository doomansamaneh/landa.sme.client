<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Scr_Users_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/scr/users/shared/forms/CreateForm.vue";
</script>
