<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') + ' ' + $t('main-menu-items.Acc_Voucher_View')
    "
  />
</template>

<script setup>
import Desktop from "components/areas/acc/voucher/shared/forms/CreateForm.vue";
</script>
