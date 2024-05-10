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

<script>
  import { computed, watch } from "vue";
  import { useCurrencyInput } from "vue-currency-input";

  export default {
    name: "CustomInputNumber",
    props: {
      modelValue: Number,
      options: Object,
    },
    setup(props) {
      const {
        inputRef,
        formattedValue,
        numberValue,
        setValue,
        setOptions,
      } = useCurrencyInput(
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

      const errorMessage = computed(() =>
        numberValue.value <= 100
          ? "Value must be greater than 100"
          : undefined
      );

      watch(
        () => props.modelValue,
        (value) => {
          setValue(value);
        }
      );

      // watch(
      //   () => props.currency,
      //   (currency) => {
      //     setOptions({ currency });
      //   }
      // );

      return { inputRef, formattedValue, errorMessage };
    },
  };
</script>
