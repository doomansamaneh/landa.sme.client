<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Cmn_Location_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/location/shared/forms/CreateForm.vue";
</script>
