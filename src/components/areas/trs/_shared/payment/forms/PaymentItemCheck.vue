<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">مبلغ</q-item-label>
      <custom-input-number
        :autofocus="autofocus"
        v-model="paymentItem.amount"
      />
    </div>

    <div class="col-md-2 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">کارمزد</q-item-label>
      <custom-input-number v-model="paymentItem.fee" />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">حساب بانکی</q-item-label>
      <bank-account-lookup
        v-model:selectedId="paymentItem.bankAccountId"
        v-model:selectedText="paymentItem.title"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">ش چک</q-item-label>
      <custom-input v-model="paymentItem.itemNo" />
    </div>

    <div class="col-md-3 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">تاریخ چک</q-item-label>
      <date-time-picker v-model="paymentItem.itemDate" />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">شماره حساب</q-item-label>
      <custom-input v-model="paymentItem.accountNo" />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">شعبه بانک</q-item-label>
      <bank-branch-lookup
        v-model:selectedId="paymentItem.bankBranchId"
        v-model:selectedText="paymentItem.bankTitle"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">شرح</q-item-label>
      <custom-input type="textarea" v-model="paymentItem.comment" />
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted } from "vue";

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

  onMounted(() => {
    if (props.item?.bankAccountTitle)
      props.item.title = `${props.item.bankAccountTitle} / ${props.item.bankAccountTypeTitle} / ${props.item.bankAccountNo} `;
  });
</script>
