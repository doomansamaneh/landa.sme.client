<template>
  <q-form ref="form" autofocus>
    <payment-item-transfer-bank
      :item="paymentItem"
      :autofocus="true"
    />
  </q-form>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { paymentMethod } from "src/constants";

  import PaymentItemTransferBank from "../PaymentItemTransferBank.vue";

  const form = ref(null);

  const props = defineProps({
    item: Object,
  });

  const paymentItem = ref({
    typeId: paymentMethod.bankTransition.id,
    amount: 0,
    fee: 0,
    bankAccountId: null,
    bankAccountDisplay: "",
    itemNo: "",
    comment: "",
  });

  onMounted(() => {
    if (props.item) {
      paymentItem.value = { ...props.item };
    }
  });

  async function submitForm(callback) {
    try {
      const isValid = await form.value.validate();
      if (isValid) {
        callback(paymentItem.value);
      }
    } catch (error) {
      console.error("Form validation error:", error);
    }
  }

  defineExpose({
    submitForm,
  });
</script>
