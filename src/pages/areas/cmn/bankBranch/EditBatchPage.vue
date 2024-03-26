<template>
  <desktop
    action="editBatch"
    :title="
      $t('shared.labels.editBatch') +
      ' ' +
      $t('main-menu-items.Cmn_BankBranch_View')
    "
  />
  <!-- <desktop v-if="$q.screen.gt.sm" />
    <mobile v-if="$q.screen.xs" /> -->
</template>

<script setup>
import Desktop from "src/components/areas/cmn/bankBranch/shared/forms/EditBatchForm.vue";
</script>
