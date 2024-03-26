<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') + ' ' + $t('main-menu-items.Crm_Job_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/crm/job/shared/forms/CreateForm.vue";
</script>
