<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Trs_Cash_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/trs/cash/shared/forms/CreateFormContainer.vue";
</script>
