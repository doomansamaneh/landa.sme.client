<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">مبلغ</q-item-label>
      <custom-input-number
        v-model="paymentItem.amount"
        hide-bottom-space
      />
    </div>

    <div class="col-md-2 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">کارمزد</q-item-label>
      <custom-input-number
        v-model="paymentItem.fee"
        hide-bottom-space
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">ش چک</q-item-label>
      <custom-input hide-bottom-space v-model="paymentItem.itemNo" />
    </div>

    <div class="col-md-3 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">تاریخ چک</q-item-label>
      <date-time-picker
        hide-bottom-space
        v-model="paymentItem.itemDate"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">شماره حساب</q-item-label>
      <custom-input
        hide-bottom-space
        v-model="paymentItem.accountNo"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">شعبه بانک</q-item-label>
      <bank-branch-lookup
        hide-bottom-space
        v-model:selectedId="paymentItem.bankBranchId"
        v-model:selectedText="paymentItem.bankTitle"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">شرح</q-item-label>
      <custom-input
        hide-bottom-space
        type="textarea"
        v-model="paymentItem.comment"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";

  import BankAccountLookup from "src/components/shared/lookups/BankAccountLookup.vue";
  import BankBranchLookup from "src/components/shared/lookups/BankBranchLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import DateTimePicker from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    item: Object,
  });

  const paymentItem = computed(() => props.item);
</script>
