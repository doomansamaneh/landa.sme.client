<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Crm_ContactType_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/crm/contactType/shared/forms/CreateForm.vue";
</script>
