<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') + ' ' + $t('main-menu-items.Cmn_Vat_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/vat/shared/forms/CreateForm.vue";
</script>
