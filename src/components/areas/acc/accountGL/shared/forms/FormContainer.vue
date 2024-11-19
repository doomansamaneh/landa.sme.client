<template>
  <form-tool-bar
    :title="title"
    :onSubmit="() => formStore.submitForm(form, action)"
  />
  <q-card class="form-container">
    <q-card-section>
      <create-form :id="id" />
      <form-guide />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import FormToolBar from "./FormToolbar.vue";
  import CreateForm from "./CreateForm.vue";
  import FormGuide from "./FormGuide.vue";

  const props = defineProps({
    title: String,
  });
</script>
