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
        <slot name="prepend"></slot>
      </template>
      <template v-if="hasAppend" #append>
        <slot name="append"></slot>
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

  const handleKeyDown = (event) => {
    if (
      event.ctrlKey &&
      (event.key === "0" ||
        event.key === "NumPad0" ||
        event.code === "Digit0")
    ) {
      event.preventDefault();

      const currentVal = props.modelValue || "0";
      const cleanVal = String(currentVal).replace(/,/g, "");

      if (parseFloat(cleanVal) > 0) {
        addThreeZeros(cleanVal);
      }
    }
  };

  const addThreeZeros = (cleanVal) => {
    try {
      const dec = new Decimal(cleanVal);
      const newVal = dec.times(1000).toString();

      emit("update:modelValue", newVal);
      displayValue.value = helper.formatNumber(newVal);
    } catch (error) {
      console.error("خطا در اضافه کردن سه صفر:", error);
    }
  };

  function onUpdate(val) {
    const el = inp.value?.$el?.querySelector("input");
    if (!el) return;

    let raw = val.replace(/,/g, "").replace(/[^\d.-]/g, "");

    let dec;
    try {
      dec = new Decimal(raw || 0);
    } catch {
      dec = new Decimal(0);
    }

    displayValue.value = helper.formatNumber(dec.toString());
    emit("update:modelValue", dec.toString());

    nextTick(() => {
      const newFormatted = displayValue.value;
      let pos = el.selectionStart;
      let leftDigits = val
        .slice(0, pos)
        .replace(/[^0-9]/g, "").length;

      let newPos = 0,
        count = 0;
      for (let i = 0; i < newFormatted.length; i++) {
        if (/\d/.test(newFormatted[i])) count++;
        if (count >= leftDigits) {
          newPos = i + 1;
          break;
        }
      }
      el.setSelectionRange(newPos, newPos);
    });
  }

  const { t } = useI18n();
  const validationMessage = ref("");

  const rules = computed(() => {
    return props.required
      ? [
          () => {
            let val;
            try {
              val = new Decimal(props.modelValue || 0);
            } catch {
              val = new Decimal(0);
            }
            const valid = !val.isNaN() && !val.isZero();
            validationMessage.value = valid
              ? ""
              : t("shared.labels.required");
            return valid;
          },
        ]
      : [];
  });

  const slots = useSlots();
  const hasPrepend = computed(() => !!slots.prepend);
  const hasAppend = computed(() => !!slots.append);

  defineExpose({
    focus: () => {
      inp.value?.$el?.querySelector("input")?.focus();
    },
  });

  watch(
    () => props.modelValue,
    (v) => {
      if (v != null && v !== "") {
        displayValue.value = helper.formatNumber(v.toString());
      } else {
        displayValue.value = "";
      }
    },
    { immediate: true },
  );
</script>
