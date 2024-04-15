<template>
  <desktop
    action="edit"
    :title="$t('shared.labels.edit') + ' ' + $t('main-menu-items.Org_Org_View')"
  />
</template>

<script setup>
import Desktop from "src/components/areas/org/org/shared/forms/CreateForm.vue";
</script>
