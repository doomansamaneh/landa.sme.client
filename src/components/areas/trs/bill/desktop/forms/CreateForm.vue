<template>
  <master-section :form-store="formStore" />
  <bill-items :form-store="formStore" class="q-mt-md" />
  <payment-items :form-store="formStore" />
</template>

<script setup>
  import MasterSection from "./v1/MasterSection.vue";
  import BillItems from "./v1/BillItems.vue";
  import PaymentItems from "src/components/areas/trs/_shared/payment/forms/PaymentItems.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
