<template>
  <div class="row q-mb-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <check-lookup
        v-model:selectedId="paymentItem.checkId"
        v-model:selectedText="paymentItem.checkSpentDisplay"
        :label="$t('shared.labels.check')"
        required
        @row-selected="checkSelected"
      />
    </div>
  </div>

  <div class="row q-mb-md">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <custom-input-number
        v-model="paymentItem.amount"
        disable
        readonly
        :label="$t('shared.labels.price')"
      />
    </div>
  </div>

  <div class="row q-mb-md">
    <div class="col-md-2 col-sm-12 col-xs-12">
      <custom-input-number
        v-model="paymentItem.fee"
        :label="$t('shared.labels.fee')"
      />
    </div>
  </div>

  <div class="row q-mt-md">
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

  import CheckLookup from "src/components/shared/Lookups/CheckLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import { payedAmount } from "src/constants/columns";

  const props = defineProps({
    item: Object,
    autofocus: Boolean,
  });

  const paymentItem = computed(() => props.item);

  const checkSelected = (row) => {
    paymentItem.value.amount = 0;
    if (row) paymentItem.value.amount = row.amount;
  };
</script>
