<template>
  <master-section ref="master" :form-store="formStore" />
  <payment-items :form-store="formStore" />
</template>

<script setup>
  import MasterSection from "./v1/MasterSection.vue";
  import PaymentItems from "src/components/areas/trs/_shared/payment/forms/PaymentItems.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
