<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Crm_ContactType_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/crm/contactType/shared/forms/CreateForm.vue";
</script>
