<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <create-form :form-store="formStore" />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useProductionModel } from "../../../_composables/useProductionModel";

  import FormToolbarContainer from "src/components/shared/FormToolbarContainer.vue";
  import CreateForm from "../../desktop/forms/CreateForm.vue";

  const props = defineProps({
    action: String,
    title: String,
    method: String,
  });

  const form = ref(null);
  const route = useRoute();

  const formStore = useProductionModel({
    baseRoute: "inv/production",
  });

  onMounted(() => {
    formStore.getById(route.params.id, props.method);
  });
</script>
