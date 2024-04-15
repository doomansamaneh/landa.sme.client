<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') + ' ' + $t('main-menu-items.Org_UnitType_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/org/unitType/shared/forms/CreateForm.vue";
</script>
