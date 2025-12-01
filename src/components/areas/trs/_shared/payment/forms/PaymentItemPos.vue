<template>
  <div class="row q-col-gutter-md">
    <div
      :class="
        isDialog
          ? 'col-md-8 col-sm-12 col-xs-12'
          : 'col-md-4 col-sm-12 col-xs-12'
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
          ? 'col-md-4 col-sm-12 col-xs-12'
          : 'col-md-2 col-sm-12 col-xs-12'
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
      <q-item-label caption class="q-mb-sm">
        {{ $t("shared.labels.bankTitle") }}
      </q-item-label>
      <bank-account-lookup
        v-model:selectedId="paymentItem.bankAccountId"
        v-model:selectedText="paymentItem.no"
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
      <q-item-label caption class="q-mb-sm">
        {{ $t("shared.labels.receiptNumber") }}
      </q-item-label>
      <custom-input hide-bottom-space v-model="paymentItem.itemNo" />
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
