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
      <sl-lookup
        v-model:selectedId="paymentItem.slId"
        v-model:selectedText="paymentItem.slTitle"
        :label="$t('shared.columns.slTitle')"
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
      <customer-lookup
        v-model:selectedId="paymentItem.customerId"
        v-model:selectedText="paymentItem.customerName"
        :label="$t('shared.paymentMethod.customer')"
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
        v-model="paymentItem.comment"
        type="textarea"
        :label="$t('shared.labels.comment')"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, nextTick, onMounted } from "vue";

  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
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
