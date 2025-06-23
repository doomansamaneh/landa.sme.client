<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="form?.submitForm"
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
