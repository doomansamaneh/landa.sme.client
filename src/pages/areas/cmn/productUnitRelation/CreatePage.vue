<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Cmn_ProductUnitRelation_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/productUnitRelation/shared/forms/CreateForm.vue";
</script>
