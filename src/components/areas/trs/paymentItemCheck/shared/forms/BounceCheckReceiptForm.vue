<template>
  <bounce-check-form ref="form" action="BounceReceiptCheck" />
</template>

<script setup>
  import { ref } from "vue";
  import BounceCheckForm from "./BounceCheckForm.vue";

  const form = ref(null);

  async function submitForm(callBack) {
    await form.value.submitForm(callBack);
  }

  defineExpose({
    submitForm,
  });
</script>
