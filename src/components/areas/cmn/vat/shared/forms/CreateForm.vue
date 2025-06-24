<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <master-section :form-store="formStore" />
        <detail-section :form-store="formStore" />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useVatModel } from "src/components/areas/_shared/_composables/useVatModel";

  import MasterSection from "./_MasterSection.vue";
  import DetailSection from "./_DetailSection.vue";
  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useVatModel();
</script>
