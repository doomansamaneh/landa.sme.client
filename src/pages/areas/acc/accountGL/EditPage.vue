<template>
  <desktop
    action="edit"
    :title="
      $t('shared.labels.edit') +
      ' ' +
      $t('main-menu-items.Acc_AccountGL_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/acc/accountGL/shared/forms/CreateFormContainer.vue";
</script>
