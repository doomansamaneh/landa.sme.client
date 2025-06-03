<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Acc_Voucher_View')
    "
    get-opening
  />
</template>

<script setup>
  import Desktop from "src/components/areas/acc/voucher/shared/forms/CreateForm.vue";
</script>
