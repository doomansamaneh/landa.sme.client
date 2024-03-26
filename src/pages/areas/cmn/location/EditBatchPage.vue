<template>
  <desktop
    action="editBatch"
    :title="
      $t('shared.labels.editBatch') +
      ' ' +
      $t('main-menu-items.Cmn_Location_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/location/shared/forms/EditBatchForm.vue";
</script>
