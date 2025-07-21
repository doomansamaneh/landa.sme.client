<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md">
      <div class="col-md-8 col-sm-12 col-xs-12">
        <custom-input-number
          ref="amountInput"
          v-model="paymentItem.amount"
          :autofocus="true"
          :label="$t('shared.labels.price')"
          required
        />
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
        <q-item-label caption class="q-mb-sm">
          {{ $t("shared.labels.fee") }}
        </q-item-label>
        <custom-input-number v-model="paymentItem.fee" />
      </div>
    </div>
    <div class="row q-mt-sm q-col-gutter-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-item-label caption class="q-mb-sm">
          {{ $t("shared.labels.bankTitle") }}
        </q-item-label>
        <bank-account-lookup
          v-model:selectedId="paymentItem.bankAccountId"
          v-model:selectedText="paymentItem.no"
          hide-bottom-space
          required
        />
      </div>
    </div>
    <div class="row q-mt-sm q-col-gutter-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-item-label caption class="q-mb-sm">
          {{ $t("shared.labels.receiptNumber") }}
        </q-item-label>
        <custom-input
          hide-bottom-space
          v-model="paymentItem.itemNo"
        />
      </div>
    </div>
    <div class="row q-mt-sm q-col-gutter-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-item-label caption class="q-mb-sm">
          {{ $t("shared.labels.comment") }}
        </q-item-label>
        <custom-input
          hide-bottom-space
          type="textarea"
          v-model="paymentItem.comment"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup>
  import { ref, onMounted, nextTick } from "vue";
  import { paymentMethod } from "src/constants";
  import BankAccountLookup from "src/components/shared/lookups/BankAccountLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const form = ref(null);
  const amountInput = ref(null);

  const props = defineProps({
    item: Object,
  });

  const paymentItem = ref({
    typeId: paymentMethod.pos.id,
    amount: 0,
    fee: 0,
    bankAccountId: null,
    no: "",
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
