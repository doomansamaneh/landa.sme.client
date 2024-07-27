<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-4 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">مبلغ</q-item-label>
      <custom-input-number
        :autofocus="autofocus"
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
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">صندوق</q-item-label>
      <cash-lookup
        v-model:selectedId="paymentItem.cashId"
        v-model:selectedText="paymentItem.cashTitle"
        hide-bottom-space
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">ش رسید</q-item-label>
      <custom-input hide-bottom-space v-model="paymentItem.itemNo" />
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

  import CashLookup from "src/components/shared/lookups/CashLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    item: Object,
    autofocus: Boolean,
  });

  const paymentItem = computed(() => props.item);
</script>
