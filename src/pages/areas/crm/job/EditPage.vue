<template>
  <desktop
    action="edit"
    :title="$t('shared.labels.edit') + ' ' + $t('main-menu-items.Crm_Job_View')"
  />
</template>

<script setup>
import Desktop from "src/components/areas/crm/job/shared/forms/CreateForm.vue";
</script>
