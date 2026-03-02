<template>
  <form-toolbar-container
    buttons
    :title="title"
    :show-save-and-new="action === 'create'"
    @submit-call-back="form?.submitForm"
    @submit-and-new-call-back="form?.submitFormAndNew"
  />

  <q-card class="form-container">
    <q-card-section>
      <create-form ref="form" :action="action" />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import CreateForm from "./CreateForm.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
</script>
