<template>
  <master-section :form-store="formStore" :form-type="formType" />
  <payment-items
    :form-store="formStore"
    :form-type="formType"
    :payment-receipt-type="paymentReceiptType"
  />
</template>

<script setup>
  import MasterSection from "./v1/MasterSection.vue";
  import PaymentItems from "src/components/areas/trs/_shared/payment/forms/PaymentItems.vue";

  const props = defineProps({
    formStore: Object,
    paymentReceiptType: Object,
  });
</script>
