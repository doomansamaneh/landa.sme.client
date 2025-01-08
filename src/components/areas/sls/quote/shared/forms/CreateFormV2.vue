<template>
  <create-form
    :title="title"
    :action="action"
    :method="method"
    :form-store="formStore"
    :model="model"
    :form-type="invoiceFormType.sales"
    :save-call-back="saveCallBack"
  />
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useQuasar } from "quasar";
  import { invoiceFormType } from "src/constants";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";

  import CreateForm from "src/components/areas/sls/_shared/invoice/shared/forms/CreateFormV2.vue";
  import ResponseDialog from "./ResponseDialog.vue";

  const props = defineProps({
    title: String,
    action: String,
    method: String,
  });

  const router = useRouter();
  const $q = useQuasar();
  const model = ref(invoiceModel);
  const quoteStore = useQuoteState();
  const formStore = useInvoiceModel({
    baseRoute: "sls/quote",
    resetCallback: quoteStore.reset,
    model: model,
  });

  function saveCallBack(responseData) {
    if (responseData?.code === 200) {
      $q.dialog({
        component: ResponseDialog,
        componentProps: {
          responseData: responseData.data,
          baseRoute: "sls/quote",
        },
      }).onOk(async () => {
        router.back();
      });
    }
  }
</script>
