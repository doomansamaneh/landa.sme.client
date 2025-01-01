<template>
  <custom-label class="q-mb-sm" :label="label" />
  <q-input
    ref="inputRef"
    v-model="formattedValue"
    outlined
    dense
    :placeholder="placeholder"
    hide-buttom-space
    clear-icon="clear"
  >
    <template #prepend>
      <slot name="prepend"></slot>
    </template>
    <template #append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script setup>
  import { watch } from "vue";
  import { useCurrencyInput } from "vue-currency-input";

  import CustomLabel from "./CustomLabel.vue";

  const props = defineProps({
    label: String,
    placeholder: String,
    required: Boolean,
    modelValue: {
      type: Number,
      default: 0,
    },
    options: {
      type: Object,
      default: () => ({
        currency: "EUR",
        currencyDisplay: "hidden",
        hideCurrencySymbolOnFocus: true,
        hideGroupingSeparatorOnFocus: false,
        hideNegligibleDecimalDigitsOnFocus: true,
        autoDecimalDigits: false,
        useGrouping: true,
        accountingSign: false,
      }),
    },
  });

  const {
    inputRef,
    formattedValue,
    numberValue,
    setValue,
    setOptions,
  } = useCurrencyInput(props.options);

  watch(
    () => props.modelValue,
    (value) => {
      setValue(value);
    }
  );

  defineExpose({
    focus: () => {
      inputRef.value.focus();
    },
  });
</script>
