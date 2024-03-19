<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Cmn_Product_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/cmn/product/shared/forms/CreateForm.vue";
</script>
