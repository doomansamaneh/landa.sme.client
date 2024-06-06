<template>
  <master-section :form-store="formStore" :form-type="formType" />
  <payment-section :form-store="formStore" :form-type="formType" />
</template>

<script setup>
  import MasterSection from "./v1/MasterSection.vue";
  import PaymentSection from "./v1/PaymentSection.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
