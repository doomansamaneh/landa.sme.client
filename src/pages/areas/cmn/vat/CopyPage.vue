<template>
  <desktop
    action="create"
    :title="$t('shared.labels.copy') + ' ' + $t('main-menu-items.Cmn_Vat_View')"
  />
</template>

<script setup>
import Desktop from "components/areas/cmn/vat/shared/forms/CreateForm.vue";
</script>
