<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Acc_AccountGL_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/acc/accountGL/shared/forms/CreateForm.vue";
</script>
