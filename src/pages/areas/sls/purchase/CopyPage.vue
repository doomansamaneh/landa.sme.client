<template>
  <desktop
    action="create"
    method="copy"
    :title="
      $t('shared.labels.copy') + ' ' + $t('main-menu-items.Sls_Purchase_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/sls/purchase/shared/forms/CreateForm.vue";
</script>
