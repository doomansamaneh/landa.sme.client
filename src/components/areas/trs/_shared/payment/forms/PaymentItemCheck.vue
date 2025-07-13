<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <custom-input-number
        v-model="paymentItem.amount"
        :label="$t('shared.labels.amount')"
        required
      />
    </div>

    <div class="col-md-2 col-sm-12 col-xs-12">
      <custom-input-number
        v-model="paymentItem.fee"
        :label="$t('shared.labels.fee')"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <bank-account-lookup
        v-model:selectedId="paymentItem.bankAccountId"
        v-model:selectedText="paymentItem.bankAccountDisplay"
        :label="$t('shared.labels.bankAccountTypeTitle')"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <custom-input
        v-model="paymentItem.itemNo"
        :label="$t('shared.labels.checkNumber')"
        required
      />
    </div>

    <div class="col-md-3 col-sm-12 col-xs-12">
      <date-time-picker
        v-model="paymentItem.itemDate"
        :label="$t('shared.labels.itemDate')"
        required
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <custom-input
        v-model="paymentItem.accountNo"
        :label="$t('shared.labels.accountNumber')"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <custom-input
        v-model="paymentItem.sayad"
        :label="$t('shared.labels.sayadNumber')"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <bank-branch-lookup
        v-model:selectedId="paymentItem.bankBranchId"
        v-model:selectedText="paymentItem.bankTitle"
        :label="$t('shared.labels.bankBranch')"
        rquired
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <custom-input
        v-model="paymentItem.comment"
        type="textarea"
        :label="$t('shared.labels.comment')"
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
