<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') +
      ' ' +
      $t('main-menu-items.Crm_Customer_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/crm/customer/shared/forms/CreateFormContainer.vue";
</script>
