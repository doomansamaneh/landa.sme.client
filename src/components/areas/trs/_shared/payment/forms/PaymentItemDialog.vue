<template>
  <q-form ref="form" auto-focus>
    <component
      :is="currentFormComponent"
      :model-value="paymentItem"
      @update:model-value="(val) => (paymentItem.value = val)"
      :is-dialog="true"
    />
  </q-form>
</template>

<script setup>
  import { ref, onMounted, nextTick, computed } from "vue";
  import { paymentMethod } from "src/constants";

  import PaymentItemCash from "./PaymentItemCash.vue";
  import PaymentItemCheck from "./PaymentItemCheck.vue";
  import PaymentItemCheckSpent from "./PaymentItemCheckSpent.vue";
  import PaymentItemCustomer from "./PaymentItemCustomer.vue";
  import PaymentItemPos from "./PaymentItemPos.vue";
  import PaymentItemTransferBank from "./PaymentItemTransferBank.vue";

  const form = ref(null);

  const props = defineProps({
    item: Object,
  });

  const paymentItem = ref({});

  onMounted(() => {
    if (props.item) {
      paymentItem.value = { ...props.item };
    }
  });

  const currentFormComponent = computed(() => {
    switch (paymentItem.value.typeId) {
      case paymentMethod?.cash?.id:
        return PaymentItemCash;
      case paymentMethod?.check?.id:
        return PaymentItemCheck;
      case paymentMethod?.checkSpent?.id:
        return PaymentItemCheckSpent;
      case paymentMethod?.bankTransition?.id:
        return PaymentItemTransferBank;
      case paymentMethod?.pos?.id:
        return PaymentItemPos;
      case paymentMethod?.customer?.id:
        return PaymentItemCustomer;
      default:
        return PaymentItemCash;
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
