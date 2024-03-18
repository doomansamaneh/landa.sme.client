<template>
  <desktop
    v-if="$q.screen.gt.sm"
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Sls_Invoice_View')
    "
  />
  <mobile
    v-else
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Sls_Invoice_View')
    "
  />

  <!-- <mobile
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Sls_Invoice_View')
    "
  /> -->
</template>

<script setup>
import Desktop from "src/components/areas/sls/invoice/desktop/forms/CreateForm.vue";
import Mobile from "src/components/areas/sls/invoice/mobile/forms/CreateForm.vue";
</script>
