<template>
  <form-toolbar-container
    :title="title"
    back-button
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
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { useCustomerModel } from "../../../_composables/useCustomerModel";

  import FormToolbarContainer from "src/components/shared/FormToolbarContainer.vue";
  import MasterSection from "./_MasterSection.vue";
  import DetailSection from "./_DetailSection.vue";

  const props = defineProps({
    title: String,
    action: String,
  });

  const form = ref(null);
  const route = useRoute();
  const formStore = useCustomerModel({
    baseRoute: "crm/customer",
  });

  onMounted(() => {
    formStore.getById(route.params.id);
  });
</script>
