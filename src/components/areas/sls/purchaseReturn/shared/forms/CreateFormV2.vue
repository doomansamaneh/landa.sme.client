<template>
  <create-form
    :title="title"
    :action="action"
    :method="method"
    :form-store="formStore"
    :model="model"
    :form-type="invoiceFormType.purchaseReturn"
  />
</template>

<script setup>
  import { ref } from "vue";
  import { invoiceFormType } from "src/constants";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";
  import { usePurchaseReturnState } from "../../../_composables/usePurchaseReturnState";

  import CreateForm from "src/components/areas/sls/_shared/invoice/shared/forms/CreateFormV2.vue";

  const props = defineProps({
    title: String,
    action: String,
    method: String,
  });

  const model = ref(invoiceModel);
  const purchaseReturnStore = usePurchaseReturnState();
  const formStore = useInvoiceModel({
    baseRoute: "sls/purchaseReturn",
    resetCallback: purchaseReturnStore.reset,
    model: model,
  });
</script>
