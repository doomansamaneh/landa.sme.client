<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') +
      ' ' +
      $t('main-menu-items.Trs_BankAccount_View')
    "
  />
  <!-- <desktop v-if="$q.screen.gt.sm" />
    <mobile v-if="$q.screen.xs" /> -->
</template>

<script setup>
import Desktop from "src/components/areas/trs/bankAccount/shared/forms/CreateForm.vue";
</script>
