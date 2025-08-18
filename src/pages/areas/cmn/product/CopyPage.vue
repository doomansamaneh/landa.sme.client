<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') +
      ' ' +
      $t('main-menu-items.Cmn_Product_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/cmn/product/shared/forms/CreateFormContainer.vue";
</script>
