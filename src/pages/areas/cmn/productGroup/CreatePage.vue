<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Cmn_ProductGroup_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/cmn/productGroup/shared/forms/CreateFormContainer.vue";
</script>
