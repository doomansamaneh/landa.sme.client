<template>
  <form-tool-bar
    :title="
      $t('shared.labels.create') +
      ' ' +
      $t('main-menu-items.Acc_AccountGL_View')
    "
    :onSubmit="() => formStore.submitForm(form, action)"
  />
  <q-card class="form-container">
    <q-card-section>
      <create-form />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import FormToolBar from "./FormToolbar.vue";
  import CreateForm from "./CreateForm.vue";
</script>
