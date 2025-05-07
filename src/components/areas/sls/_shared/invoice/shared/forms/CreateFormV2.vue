<template>
  <form-toolbar-container
    buttons
    :title="title"
    :show-save-and-new="action === formAction.create"
    @submit-call-back="submitForm"
    @submit-and-new-call-back="submitAndNewForm"
  />

  <q-form ref="form" autofocus>
    <desktop
      v-if="$q.screen.gt.sm"
      :form-store="formStore"
      :model="model"
      :form-type="formType"
    />
    <mobile
      v-else
      :form-store="formStore"
      :model="model"
      :form-type="formType"
    />
  </q-form>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { formAction, invoiceFormType } from "src/constants";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";

  import FormToolbarContainer from "src/components/shared/FormToolbarContainer.vue";
  import Desktop from "src/components/areas/sls/_shared/invoice/desktop/forms/CreateFormV2.vue";
  import Mobile from "src/components/areas/sls/_shared/invoice/mobile/forms/CreateForm.vue";

  const props = defineProps({
    title: String,
    action: String,
    method: String,
    model: invoiceModel,
    formStore: useInvoiceModel,
    formType: invoiceFormType,
    saveCallBack: Function,
  });
  const route = useRoute();
  const form = ref(null);

  const submitForm = () => {
    props.formStore.submitForm(
      form.value,
      props.action,
      props.saveCallBack
    );
  };

  const submitAndNewForm = () => {
    props.formStore.submitForm(
      form.value,
      props.action,
      props.formStore.getCreateModel
    );
  };

  onMounted(() => {
    props.formStore.getById(route.params.id, props.method);
  });
</script>
