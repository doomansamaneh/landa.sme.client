<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">
        {{ $t("shared.labels.amount") }}
      </q-item-label>
      <custom-input-number
        v-model="paymentItem.amount"
        :autofocus="autofocus"
        hide-bottom-space
        required
      />
    </div>

    <div class="col-md-2 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">
        {{ $t("shared.labels.fee") }}
      </q-item-label>
      <custom-input-number
        v-model="paymentItem.fee"
        hide-bottom-space
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
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
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">
        {{ $t("shared.labels.receiptNumber") }}
      </q-item-label>
      <custom-input hide-bottom-space v-model="paymentItem.itemNo" />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
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
</template>

<script setup>
  import { computed } from "vue";

  import BankAccountLookup from "src/components/shared/lookups/BankAccountLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    item: Object,
    autofocus: Boolean,
  });

  const paymentItem = computed(() => props.item);
</script>
