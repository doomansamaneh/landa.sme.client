<template>
  <create-form
    :title="title"
    :action="action"
    :method="method"
    :form-store="formStore"
    :model="model"
    :form-type="invoiceFormType.purchase"
  />
</template>

<script setup>
  import { ref } from "vue";
  import { invoiceFormType } from "src/constants";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";
  import { usePurchaseState } from "../../../_composables/usePurchaseState";

  import CreateForm from "src/components/areas/sls/_shared/invoice/shared/forms/CreateForm.vue";

  const props = defineProps({
    title: String,
    action: String,
    method: String,
  });

  const model = ref(invoiceModel);
  const purchaseStore = usePurchaseState();
  const formStore = useInvoiceModel({
    baseRoute: "sls/purchase",
    resetCallback: purchaseStore.reset,
    model: model,
  });
</script>
