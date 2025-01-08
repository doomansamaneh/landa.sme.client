<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="
      formStore.submitForm(form, action, saveCallBack)
    "
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
  import { invoiceFormType } from "src/constants";
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

  onMounted(() => {
    props.formStore.getById(route.params.id, props.method);
  });
</script>
