<template>
  <q-input
    ref="inputRef"
    v-model="formattedValue"
    outlined
    dense
    clear-icon="clear"
  >
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script setup>
import { watch } from "vue";
import { useCurrencyInput } from "vue-currency-input";

const props = defineProps({
  modelValue: Number,
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
