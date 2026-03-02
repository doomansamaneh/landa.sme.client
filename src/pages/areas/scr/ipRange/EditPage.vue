<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Scr_IpRange_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/scr/ipRange/shared/forms/CreateFormContainer.vue";
</script>
