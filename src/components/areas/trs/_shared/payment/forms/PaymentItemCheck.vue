<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <custom-input-number
        v-model="paymentItem.amount"
        label="مبلغ"
        required
      />
    </div>

    <div class="col-md-2 col-sm-12 col-xs-12">
      <custom-input-number v-model="paymentItem.fee" label="کارمزد" />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <bank-account-lookup
        v-model:selectedId="paymentItem.bankAccountId"
        v-model:selectedText="paymentItem.bankAccountDisplay"
        label="حساب بانکی"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <custom-input
        v-model="paymentItem.itemNo"
        label="ش چک"
        required
      />
    </div>

    <div class="col-md-3 col-sm-12 col-xs-12">
      <date-time-picker
        v-model="paymentItem.itemDate"
        label="تاریخ چک"
        required
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <custom-input
        v-model="paymentItem.accountNo"
        label="شماره حساب"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <bank-branch-lookup
        v-model:selectedId="paymentItem.bankBranchId"
        v-model:selectedText="paymentItem.bankTitle"
        label="شعبه بانک"
        rquired
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <custom-input
        v-model="paymentItem.comment"
        type="textarea"
        label="شرح"
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
    autofocus: Boolean,
  });

  const paymentItem = computed(() => props.item);
</script>
