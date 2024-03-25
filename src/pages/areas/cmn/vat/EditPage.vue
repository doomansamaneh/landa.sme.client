<template>
  <desktop
    action="edit"
    :title="$t('shared.labels.edit') + ' ' + $t('main-menu-items.Cmn_Vat_View')"
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/vat/shared/forms/CreateForm.vue";
</script>
