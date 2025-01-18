<template>
  <master-section ref="master" :form-store="formStore" />
  <payment-items
    :form-store="formStore"
    :payment-receipt-type="paymentReceiptType"
  />
</template>

<script setup>
  import { paymentOrReceipt } from "src/constants/enums";

  import MasterSection from "./v1/MasterSection.vue";
  import PaymentItems from "src/components/areas/trs/_shared/payment/forms/PaymentItems.vue";

  const props = defineProps({
    formStore: Object,
    paymentReceiptType: Object,
  });
</script>
