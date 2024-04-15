<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Org_UnitType_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/org/unitType/shared/forms/CreateForm.vue";
</script>
