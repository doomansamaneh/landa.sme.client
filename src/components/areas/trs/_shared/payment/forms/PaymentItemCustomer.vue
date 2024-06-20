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
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">حساب معین</q-item-label>
      <sl-lookup
        hide-bottom-space
        v-model:selectedId="paymentItem.slId"
        v-model:selectedText="paymentItem.slTitle"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">
        طرف حساب، مخاطب
      </q-item-label>
      <customer-lookup
        hide-bottom-space
        v-model:selectedId="paymentItem.customerId"
        v-model:selectedText="paymentItem.customerName"
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

  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import DateTimePicker from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    item: Object,
  });

  const paymentItem = computed(() => props.item);
</script>
