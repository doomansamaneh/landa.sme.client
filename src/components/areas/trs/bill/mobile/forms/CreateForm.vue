<template>
  <master-section :form-store="formStore" />
  <bill-items :form-store="formStore" class="q-mt-md" />
  <payment-items
    :form-store="formStore"
    :payment-receipt-type="paymentOrReceipt.payment"
  />
</template>

<script setup>
  import { paymentOrReceipt } from "src/constants";
  import MasterSection from "../../shared/forms/MasterSection.vue";
  import BillItems from "./BillItems.vue";
  import PaymentItems from "src/components/areas/trs/_shared/payment/forms/PaymentItems.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
