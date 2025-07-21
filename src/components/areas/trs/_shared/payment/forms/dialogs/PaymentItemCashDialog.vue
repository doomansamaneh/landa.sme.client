<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md">
      <div class="col-md-8 col-sm-12 col-xs-12">
        <custom-input-number
          ref="amountInput"
          v-model="paymentItem.amount"
          :label="$t('shared.labels.price')"
          required
        />
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
        <custom-input-number
          v-model="paymentItem.fee"
          :label="$t('shared.labels.fee')"
        />
      </div>
    </div>
    <div class="row q-mt-sm q-col-gutter-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <cash-lookup
          v-model:selectedId="paymentItem.cashId"
          v-model:selectedText="paymentItem.cashTitle"
          :label="$t('shared.labels.cash')"
          required
        />
      </div>
    </div>
    <div class="row q-mt-sm q-col-gutter-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <custom-input
          v-model="paymentItem.itemNo"
          :label="$t('shared.labels.receiptNumber')"
        />
      </div>
    </div>
    <div class="row q-mt-sm q-col-gutter-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <custom-input
          v-model="paymentItem.comment"
          type="textarea"
          :label="$t('shared.labels.comment')"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup>
  import { ref, onMounted, nextTick } from "vue";
  import { paymentMethod } from "src/constants";
  import CashLookup from "src/components/shared/Lookups/CashLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const form = ref(null);
  const amountInput = ref(null);

  const props = defineProps({
    item: Object,
  });

  const paymentItem = ref({
    typeId: paymentMethod.cash.id,
    amount: 0,
    fee: 0,
    cashId: null,
    cashTitle: "",
    itemNo: "",
    comment: "",
  });

  onMounted(() => {
    if (props.item) {
      paymentItem.value = { ...props.item };
    }
    nextTick(() => {
      if (amountInput.value && amountInput.value.focus) {
        amountInput.value.focus();
      }
    });
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
