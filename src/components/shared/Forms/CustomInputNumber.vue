<template>
  <div>
    <custom-label class="q-mb-sm" :label="label" />

    <q-input
      ref="inp"
      :model-value="displayValue"
      @update:model-value="onUpdate"
      @keydown="handleKeyDown"
      :placeholder="placeholder"
      inputmode="decimal"
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
        <slot name="prepend" />
      </template>

      <template v-if="hasAppend" #append>
        <slot name="append" />
      </template>
    </q-input>
  </div>
</template>

<script setup>
  import { ref, computed, useSlots, watch, nextTick } from "vue";
  import Decimal from "decimal.js";
  import { useI18n } from "vue-i18n";
  import { helper } from "src/helpers";

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
      type: [String, Number],
      default: "0",
    },
  });

  const emit = defineEmits(["update:modelValue"]);

  const inp = ref(null);
  const displayValue = ref("");

  const { t } = useI18n();

  const validationMessage = ref("");

  const slots = useSlots();

  const hasPrepend = computed(() => !!slots.prepend);
  const hasAppend = computed(() => !!slots.append);

  /* -------------------------------------------------------------------------- */
  /* Input                                                                       */
  /* -------------------------------------------------------------------------- */

  const getInputElement = () => {
    return inp.value?.$el?.querySelector("input") ?? null;
  };

  /* -------------------------------------------------------------------------- */
  /* Normalize                                                                   */
  /* -------------------------------------------------------------------------- */

  const normalizeInput = (value) => {
    if (value == null) {
      return "";
    }

    let result = String(value);

    // Persian digits -> English
    result = result.replace(/[۰-۹]/g, (char) =>
      String(char.charCodeAt(0) - 1776),
    );

    // Arabic digits -> English
    result = result.replace(/[٠-٩]/g, (char) =>
      String(char.charCodeAt(0) - 1632),
    );

    // Arabic decimal separator -> English
    result = result.replace(/٫/g, ".");

    // Remove thousands separator
    result = result.replace(/,/g, "");

    // Keep only digits, minus and decimal point
    result = result.replace(/[^\d.-]/g, "");

    // Keep minus only at the beginning
    result = result.replace(/(?!^)-/g, "");

    // Keep only one decimal point
    const firstDot = result.indexOf(".");

    if (firstDot !== -1) {
      result =
        result.slice(0, firstDot + 1) +
        result.slice(firstDot + 1).replace(/\./g, "");
    }

    return result;
  };

  /* -------------------------------------------------------------------------- */
  /* Number validation                                                           */
  /* -------------------------------------------------------------------------- */

  const isValidNumber = (value) => {
    if (!value || value === "-" || value === "." || value === "-.") {
      return false;
    }

    try {
      const decimal = new Decimal(value);

      return !decimal.isNaN() && decimal.isFinite();
    } catch {
      return false;
    }
  };

  /* -------------------------------------------------------------------------- */
  /* Format                                                                      */
  /* -------------------------------------------------------------------------- */

  const formatValue = (value) => {
    if (!value || value === "-" || value === "." || value === "-.") {
      return value;
    }

    try {
      return helper.formatNumber(value);
    } catch {
      return value;
    }
  };

  /* -------------------------------------------------------------------------- */
  /* Keyboard                                                                    */
  /* -------------------------------------------------------------------------- */

  const handleKeyDown = (event) => {
    /*
     * Windows / Linux:
     * Ctrl + 0
     *
     * macOS:
     * Cmd + 0
     */
    const modifierKey = event.ctrlKey || event.metaKey;

    const isZeroKey =
      event.key === "0" ||
      event.code === "Digit0" ||
      event.code === "Numpad0";

    if (!modifierKey || !isZeroKey) {
      return;
    }

    event.preventDefault();

    const currentValue = normalizeInput(props.modelValue);

    if (!isValidNumber(currentValue)) {
      return;
    }

    try {
      const decimal = new Decimal(currentValue);

      if (!decimal.gt(0)) {
        return;
      }

      const newValue = decimal.times(1000).toString();

      emit("update:modelValue", newValue);

      displayValue.value = formatValue(newValue);

      nextTick(() => {
        const el = getInputElement();

        if (!el) {
          return;
        }

        el.setSelectionRange(el.value.length, el.value.length);
      });
    } catch {
      // Ignore invalid values
    }
  };

  /* -------------------------------------------------------------------------- */
  /* Update                                                                      */
  /* -------------------------------------------------------------------------- */

  const onUpdate = (value) => {
    const el = getInputElement();

    if (!el) {
      return;
    }

    const oldValue = String(value ?? "");

    const oldCursor = el.selectionStart ?? oldValue.length;

    /*
     * Number of actual digits before cursor.
     *
     * This is used to restore the cursor after
     * thousands separators are inserted.
     */
    const digitsBeforeCursor = oldValue
      .slice(0, oldCursor)
      .replace(/[^\d]/g, "").length;

    let raw = normalizeInput(oldValue);

    /* ---------------------------------------------------------------------- */
    /* Empty                                                                    */
    /* ---------------------------------------------------------------------- */

    if (raw === "") {
      displayValue.value = "";

      emit("update:modelValue", "");

      return;
    }

    /* ---------------------------------------------------------------------- */
    /* "." => "0."                                                             */
    /* ---------------------------------------------------------------------- */

    if (raw === ".") {
      raw = "0.";
    }

    /* ---------------------------------------------------------------------- */
    /* "-." => "-0."                                                           */
    /* ---------------------------------------------------------------------- */

    if (raw === "-.") {
      raw = "-0.";
    }

    /* ---------------------------------------------------------------------- */
    /* Temporary decimal state                                                 */
    /* ---------------------------------------------------------------------- */

    /*
     * Do NOT pass "0." or "-0." through Decimal/helper.formatNumber.
     *
     * Otherwise they may become "0" / "-0" and the user
     * would need to type the decimal point again.
     */
    if (raw === "0." || raw === "-0.") {
      displayValue.value = raw;

      emit("update:modelValue", raw);

      nextTick(() => {
        const input = getInputElement();

        if (input) {
          input.setSelectionRange(
            input.value.length,
            input.value.length,
          );
        }
      });

      return;
    }

    /* ---------------------------------------------------------------------- */
    /* Invalid value                                                           */
    /* ---------------------------------------------------------------------- */

    if (!isValidNumber(raw)) {
      return;
    }

    /* ---------------------------------------------------------------------- */
    /* Preserve trailing decimal point                                         */
    /* ---------------------------------------------------------------------- */

    const hasTrailingDot = raw.endsWith(".");

    /* ---------------------------------------------------------------------- */
    /* Format                                                                    */
    /* ---------------------------------------------------------------------- */

    let formatted;

    try {
      formatted = formatValue(raw);

      /*
       * Example:
       *
       * raw       = "1234."
       * formatted = "1,234"
       *
       * We need:
       *
       * formatted = "1,234."
       */
      if (hasTrailingDot && !formatted.endsWith(".")) {
        formatted += ".";
      }
    } catch {
      formatted = oldValue;
    }

    /* ---------------------------------------------------------------------- */
    /* Update                                                                    */
    /* ---------------------------------------------------------------------- */

    displayValue.value = formatted;

    emit("update:modelValue", raw);

    /* ---------------------------------------------------------------------- */
    /* Restore cursor                                                           */
    /* ---------------------------------------------------------------------- */

    nextTick(() => {
      const input = getInputElement();

      if (!input) {
        return;
      }

      const newValue = input.value;

      let digitCount = 0;
      let newCursor = newValue.length;

      for (let i = 0; i < newValue.length; i++) {
        if (/\d/.test(newValue[i])) {
          digitCount++;

          if (digitCount >= digitsBeforeCursor) {
            newCursor = i + 1;
            break;
          }
        }
      }

      /*
       * If the user is typing after a decimal point,
       * keep the cursor at the end.
       */
      if (hasTrailingDot && oldCursor === oldValue.length) {
        newCursor = newValue.length;
      }

      input.setSelectionRange(newCursor, newCursor);
    });
  };

  /* -------------------------------------------------------------------------- */
  /* Validation                                                                  */
  /* -------------------------------------------------------------------------- */

  const rules = computed(() => {
    if (!props.required) {
      return [];
    }

    return [
      () => {
        let valid = false;

        try {
          const value = new Decimal(props.modelValue || 0);

          valid = !value.isNaN() && !value.isZero();
        } catch {
          valid = false;
        }

        validationMessage.value = valid
          ? ""
          : t("shared.labels.required");

        return valid;
      },
    ];
  });

  /* -------------------------------------------------------------------------- */
  /* External modelValue changes                                                 */
  /* -------------------------------------------------------------------------- */

  watch(
    () => props.modelValue,
    (value) => {
      if (value == null || value === "") {
        displayValue.value = "";
        return;
      }

      const normalized = normalizeInput(value);

      if (!normalized) {
        displayValue.value = "";
        return;
      }

      /*
       * Preserve trailing decimal point if modelValue
       * is something like "1."
       */
      if (normalized.endsWith(".")) {
        const withoutDot = normalized.slice(0, -1);

        displayValue.value = formatValue(withoutDot) + ".";

        return;
      }

      displayValue.value = formatValue(normalized);
    },
    {
      immediate: true,
    },
  );

  /* -------------------------------------------------------------------------- */
  /* Public API                                                                  */
  /* -------------------------------------------------------------------------- */

  defineExpose({
    focus: () => {
      getInputElement()?.focus();
    },

    select: () => {
      getInputElement()?.select();
    },
  });
</script>
