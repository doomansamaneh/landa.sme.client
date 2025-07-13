<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <custom-input-number
        v-model="paymentItem.amount"
        :label="$t('shared.labels.amount')"
        requird
      />
    </div>

    <div class="col-md-2 col-sm-12 col-xs-12">
      <custom-input-number
        v-model="paymentItem.fee"
        :label="$t('shared.labels.fee')"
        required
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <sl-lookup
        v-model:selectedId="paymentItem.slId"
        v-model:selectedText="paymentItem.slTitle"
        :label="$t('shared.labels.subLedgerAccount')"
        required
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <customer-lookup
        v-model:selectedId="paymentItem.customerId"
        v-model:selectedText="paymentItem.customerName"
        :label="$t('shared.labels.customerContact')"
        required
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

  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    item: Object,
    autofocus: Boolean,
  });

  const paymentItem = computed(() => props.item);
</script>
