<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Sls_Purchase_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/sls/purchase/shared/forms/CreateForm.vue";
</script>
