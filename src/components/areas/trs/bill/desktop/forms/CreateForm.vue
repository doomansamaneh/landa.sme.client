<template>
  <master-section :form-store="formStore" />
  <bill-items :form-store="formStore" class="q-mt-md" />
  <payment-section :form-store="formStore" />
</template>

<script setup>
  import MasterSection from "./v1/MasterSection.vue";
  import BillItems from "./v1/BillItems.vue";
  import PaymentSection from "./v1/PaymentSection.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
