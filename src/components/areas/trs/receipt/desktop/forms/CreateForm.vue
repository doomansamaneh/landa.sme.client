<template>
  <master-section :form-store="formStore" :form-type="formType" />
  <div class="q-mt-md">
    <payment-section :form-store="formStore" :form-type="formType" />
  </div>
</template>

<script setup>
  import MasterSection from "./v1/MasterSection.vue";
  import PaymentSection from "./v1/PaymentSection.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
