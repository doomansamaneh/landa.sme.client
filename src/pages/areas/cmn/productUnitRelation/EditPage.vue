<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Cmn_ProductUnitRelation_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/productUnitRelation/shared/forms/CreateForm.vue";
</script>
