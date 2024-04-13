<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') + ' ' + $t('main-menu-items.Acc_AccountCL_View')
    "
  />
  <!-- <desktop v-if="$q.screen.gt.sm" />
    <mobile v-if="$q.screen.xs" /> -->
</template>

<script setup>
import Desktop from "src/components/areas/cmn/bank/shared/forms/CreateForm.vue";
</script>
