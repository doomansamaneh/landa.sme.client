<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Org_Unit_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/org/unit/shared/forms/CreateForm.vue";
</script>
