<template>
  <tool-bar
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
  import { useRepositionModel } from "../../../_composables/useRepositionModel";

  import ToolBar from "src/components/shared/FormToolBar.vue";
  import CreateForm from "../../desktop/forms/CreateForm.vue";

  const props = defineProps({
    action: String,
    title: String,
    method: String,
  });

  const form = ref(null);
  const route = useRoute();

  const formStore = useRepositionModel({
    baseRoute: "inv/modifyStock",
  });

  onMounted(() => {
    formStore.getById(route.params.id, props.method);
  });
</script>
