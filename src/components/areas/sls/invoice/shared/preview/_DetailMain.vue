<template>
  <payment-detail :model="model"></payment-detail>
</template>

<script setup>
import PaymentDetail from "./_DetailPayments.vue";

const props = defineProps({
  model: Object,
  formStore: Object,
});
</script>
