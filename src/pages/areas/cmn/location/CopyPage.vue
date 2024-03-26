<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') + ' ' + $t('main-menu-items.Cmn_Location_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/location/shared/forms/CreateForm.vue";
</script>
