<template>
  <cash-check-form ref="form" action="CashReceiptCheck" />
</template>

<script setup>
  import { ref } from "vue";

  import CashCheckForm from "./CashCheckForm.vue";

  const form = ref(null);

  async function submitForm(callBack) {
    await form.value.submitForm(callBack);
  }

  defineExpose({
    submitForm,
  });
</script>
