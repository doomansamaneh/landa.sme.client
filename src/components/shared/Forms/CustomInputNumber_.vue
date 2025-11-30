<template>
  <custom-label class="q-mb-sm" :label="label" />
  <q-input
    ref="inputRef"
    v-model="formattedValue"
    :placeholder="placeholder"
    clear-icon="clear"
    :disable="disable"
    :readonly="readonly"
    :no-error-icon="noErrorIcon"
    outlined
    dense
    hide-bottom-space
    lazy-rules
    :rules="rules"
    :autofocus="autofocus"
  >
    <validation-alert
      v-if="validationMessage"
      :message="validationMessage"
    />

    <template v-if="hasPrepend" #prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-if="hasAppend" #append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script setup>
  import { ref, computed, watch, useSlots } from "vue";
  import { useCurrencyInput } from "vue-currency-input";
  import { useI18n } from "vue-i18n";

  import CustomLabel from "./CustomLabel.vue";
  import ValidationAlert from "./ValidationAlert.vue";

  const props = defineProps({
    label: String,
    placeholder: String,
    required: Boolean,
    disable: Boolean,
    noErrorIcon: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
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
        precision: { min: 0, max: 4 },
      }),
    },
  });

  const { t } = useI18n();
  const slots = useSlots();

  const validationMessage = ref("");

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

  const rules = computed(() => {
    return props.required
      ? [
          (val) => {
            // For number inputs, we need to check if the value is not 0 and not empty
            const valid =
              numberValue.value !== null &&
              numberValue.value !== undefined &&
              numberValue.value !== "";
            validationMessage.value = valid
              ? ""
              : t("shared.labels.required");
            return valid;
          },
        ]
      : [];
  });

  const hasPrepend = computed(() => !!slots.prepend);
  const hasAppend = computed(() => !!slots.append);

  defineExpose({
    focus: () => {
      inputRef.value.focus();
    },
  });
</script>
