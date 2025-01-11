<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">مبلغ</q-item-label>
      <custom-input-number
        v-model="paymentItem.amount"
        :autofocus="autofocus"
      />
    </div>

    <div class="col-md-2 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">کارمزد</q-item-label>
      <custom-input-number v-model="paymentItem.fee" />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">بانک</q-item-label>
      <bank-account-lookup
        v-model:selectedId="paymentItem.bankAccountId"
        v-model:selectedText="paymentItem.title"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">ش رسید</q-item-label>
      <custom-input v-model="paymentItem.itemNo" />
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
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
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
