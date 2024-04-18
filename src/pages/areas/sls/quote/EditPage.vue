<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Sls_Quote_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/sls/quote/shared/forms/CreateForm.vue";
</script>
