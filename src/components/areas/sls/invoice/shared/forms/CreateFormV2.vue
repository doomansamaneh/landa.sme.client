<template>
  <create-form
    :title="title"
    :action="action"
    :method="method"
    :form-store="formStore"
    :model="model"
    :form-type="invoiceFormType.sales"
  />
</template>

<script setup>
  import { ref } from "vue";
  import { invoiceFormType } from "src/constants";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";
  import { useInvoiceState } from "../../../_composables/useInvoiceState";

  import CreateForm from "src/components/areas/sls/_shared/invoice/shared/forms/CreateFormV2.vue";

  const props = defineProps({
    title: String,
    action: String,
    method: String,
  });

  const model = ref(invoiceModel);
  const invoiceStore = useInvoiceState();
  const formStore = useInvoiceModel({
    baseRoute: "sls/invoice",
    resetCallback: invoiceStore.reset,
    model: model,
  });
</script>
