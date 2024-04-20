<template>
  <desktop
    v-if="$q.screen.gt.sm"
    action="create"
    :title="
      $t('shared.labels.create') + ' ' + $t('main-menu-items.Sls_Invoice_View')
    "
  />
  <mobile
    v-else
    action="create"
    :title="
      $t('shared.labels.create') + ' ' + $t('main-menu-items.Sls_Invoice_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/sls/_shared/invoice/desktop/forms/CreateForm.vue";
import Mobile from "src/components/areas/sls/_shared/invoice/mobile/forms/CreateForm.vue";
</script>
