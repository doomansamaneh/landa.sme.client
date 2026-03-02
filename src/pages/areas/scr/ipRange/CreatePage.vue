<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Scr_IpRange_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/scr/ipRange/shared/forms/CreateFormContainer.vue";
</script>
