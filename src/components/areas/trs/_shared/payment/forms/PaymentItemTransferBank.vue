<template>
  <div class="row q-col-gutter-md">
    <div
      :class="
        isDialog
          ? 'col-md-6 col-sm-12 col-xs-12'
          : 'col-md-3 col-sm-12 col-xs-12'
      "
    >
      <custom-input-number
        ref="focusable"
        v-model="paymentItem.amount"
        :label="$t('shared.labels.price')"
        required
      />
    </div>

    <div
      :class="
        isDialog
          ? 'col-md-6 col-sm-12 col-xs-12'
          : 'col-md-3 col-sm-12 col-xs-12'
      "
    >
      <custom-input-number
        v-model="paymentItem.fee"
        :label="$t('shared.labels.fee')"
        required_
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div
      :class="
        isDialog
          ? 'col-md-12 col-sm-12 col-xs-12'
          : 'col-md-6 col-sm-12 col-xs-12'
      "
    >
      <bank-account-lookup
        v-model:selectedId="paymentItem.bankAccountId"
        v-model:selectedText="paymentItem.bankAccountDisplay"
        :label="$t('shared.columns.bankAccount')"
        required
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div
      :class="
        isDialog
          ? 'col-md-12 col-sm-12 col-xs-12'
          : 'col-md-6 col-sm-12 col-xs-12'
      "
    >
      <custom-input
        v-model="paymentItem.itemNo"
        :label="$t('shared.labels.receiptNumber')"
      />
    </div>
  </div>

  <div class="row q-mt-sm q-col-gutter-md">
    <div
      :class="
        isDialog
          ? 'col-md-12 col-sm-12 col-xs-12'
          : 'col-md-6 col-sm-12 col-xs-12'
      "
    >
      <custom-input
        type="textarea"
        v-model="paymentItem.comment"
        :label="$t('shared.labels.comment')"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, nextTick } from "vue";

  import BankAccountLookup from "src/components/shared/lookups/BankAccountLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const focusable = ref(null);

  const props = defineProps({
    modelValue: Object,
    autofocus: Boolean,
    isDialog: Boolean,
  });

  const paymentItem = computed(() => props.modelValue);

  onMounted(() => {
    nextTick(() => {
      if (focusable.value && focusable.value.focus) {
        focusable.value.focus();
      }
    });
  });
</script>
