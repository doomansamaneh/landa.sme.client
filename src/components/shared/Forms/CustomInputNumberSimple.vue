<template>
  <input ref="inputRef" type="text" />
</template>

<script setup>
  import { useCurrencyInput } from "vue-currency-input";

  const props = defineProps({
    modelValue: Number,
    options: Object,
  });

  const { inputRef } = useCurrencyInput(
    props.options ?? {
      currency: "EUR",
      currencyDisplay: "hidden",
      hideCurrencySymbolOnFocus: true,
      hideGroupingSeparatorOnFocus: false,
      hideNegligibleDecimalDigitsOnFocus: true,
      autoDecimalDigits: false,
      useGrouping: true,
      accountingSign: false,
    }
  );
</script>
