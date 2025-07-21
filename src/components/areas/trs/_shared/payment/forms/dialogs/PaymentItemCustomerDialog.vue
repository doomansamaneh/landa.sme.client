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
          required
        />
      </div>
    </div>
    <div class="row q-mt-sm q-col-gutter-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <sl-lookup
          v-model:selectedId="paymentItem.slId"
          v-model:selectedText="paymentItem.slTitle"
          :label="$t('shared.labels.subLedgerAccount')"
          required
        />
      </div>
    </div>
    <div class="row q-mt-sm q-col-gutter-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <customer-lookup
          v-model:selectedId="paymentItem.customerId"
          v-model:selectedText="paymentItem.customerName"
          :label="$t('shared.labels.customerContact')"
          required
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

  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const form = ref(null);
  const amountInput = ref(null);

  const props = defineProps({
    item: Object,
  });

  const paymentItem = ref({
    typeId: paymentMethod.customer.id,
    amount: 0,
    fee: 0,
    slId: null,
    slTitle: "",
    customerId: null,
    customerName: "",
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
