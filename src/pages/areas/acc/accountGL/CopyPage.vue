<template>
  <desktop
    action="create"
    :title="
      $t('shared.labels.copy') +
      ' ' +
      $t('main-menu-items.Acc_AccountGL_View')
    "
  />
</template>

<script setup>
  import Desktop from "src/components/areas/acc/accountGL/shared/forms/CreateFormContainer.vue";
</script>
