<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') +
      ' ' +
      $t('main-menu-items.Sls_PurchaseType_View')
    "
  />
  <!-- <desktop v-if="$q.screen.gt.sm" />
    <mobile v-if="$q.screen.xs" /> -->
</template>

<script setup>
import Desktop from "src/components/areas/sls/purchaseType/shared/forms/CreateForm.vue";
</script>
