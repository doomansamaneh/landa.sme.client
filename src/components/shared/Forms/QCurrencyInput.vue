<template>
  <q-input
    ref="inputRef"
    input-class="text-right"
    :error-message="errorMessage"
    :error="!!errorMessage"
    v-model="formattedValue"
    dense
    outlined
    label="Amount"
  />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";
import { computed, watch } from "vue";

export default {
  name: "QCurrencyInput",
  props: {
    modelValue: Number,
    currency: String,
  },
  setup(props) {
    const {
      inputRef,
      formattedValue,
      numberValue,
      setValue,
      setOptions,
    } = useCurrencyInput({ currency: props.currency });

    const errorMessage = computed(() =>
      numberValue.value <= 100 ? "Value must be greater than 100" : undefined
    );

    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );

    watch(
      () => props.currency,
      (currency) => {
        setOptions({ currency });
      }
    );

    return { inputRef, formattedValue, errorMessage };
  },
};
</script>
