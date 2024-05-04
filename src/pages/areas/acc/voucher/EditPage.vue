<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') + ' ' + $t('main-menu-items.Acc_Voucher_View')
    "
  />
</template>

<script setup>
import Desktop from "src/components/areas/acc/voucher/shared/forms/CreateForm.vue";
</script>
