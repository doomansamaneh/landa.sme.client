<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') + ' ' + $t('main-menu-items.Org_Unit_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/org/unit/shared/forms/CreateForm.vue";
</script>
