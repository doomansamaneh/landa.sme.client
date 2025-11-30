<template>
  <custom-label class="q-mb-sm" :label="label" />
  <q-input
    ref="inp"
    :model-value="displayValue"
    @update:model-value="onUpdate"
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
</template>

<script setup>
  import { ref, computed, useSlots, watch, nextTick } from "vue";
  import Decimal from "decimal.js";
  import { useI18n } from "vue-i18n";
  import CustomLabel from "./CustomLabel.vue";
  import ValidationAlert from "./ValidationAlert.vue";
  import { helper } from "src/helpers";

  // -------------------------
  // Props
  // -------------------------
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

  // // -------------------------
  // // Helper: formatNumber
  // // -------------------------
  // function formatNumber(raw) {
  //   if (raw == null || raw === "") return "";

  //   let negative = false;
  //   raw = String(raw).replace(/[^0-9.\-]/g, "");
  //   if (raw.startsWith("-")) {
  //     negative = true;
  //     raw = raw.slice(1);
  //   }

  //   let [intPart, decPart] = raw.split(".");
  //   if (!intPart) intPart = "0";

  //   // حذف صفرهای پیشرو فقط برای integer ≥ 1
  //   intPart = intPart.replace(/^0+(?=\d)/, "");

  //   // اضافه کردن جداکننده هزارگان
  //   const intWithCommas = intPart.replace(
  //     /\B(?=(\d{3})+(?!\d))/g,
  //     ","
  //   );

  //   const result = decPart
  //     ? intWithCommas + "." + decPart
  //     : intWithCommas;

  //   return negative ? `(${result})` : result;
  // }

  // -------------------------
  // هنگام تایپ کاربر
  // -------------------------
  function onUpdate(val) {
    const el = inp.value?.$el?.querySelector("input");
    if (!el) return;

    // پاکسازی و فقط اعداد و ممیز
    let raw = val.replace(/,/g, "").replace(/[^\d.-]/g, "");

    // تبدیل به Decimal برای دقت
    let dec;
    try {
      dec = new Decimal(raw || 0);
    } catch {
      dec = new Decimal(0);
    }

    // فرمت برای نمایش
    displayValue.value = helper.formatNumber(dec.toString());

    // emit مقدار خام برای modelValue
    emit("update:modelValue", dec.toString());

    // حفظ caret
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

  // -------------------------
  // Rules اعتبارسنجی
  // -------------------------
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

  // -------------------------
  // Prepend / Append
  // -------------------------
  const slots = useSlots();
  const hasPrepend = computed(() => !!slots.prepend);
  const hasAppend = computed(() => !!slots.append);

  // -------------------------
  // Expose focus
  // -------------------------
  defineExpose({
    focus: () => {
      inp.value?.$el?.querySelector("input")?.focus();
    },
  });

  // -------------------------
  // همگام‌سازی prop -> display
  // -------------------------
  watch(
    () => props.modelValue,
    (v) => {
      if (v != null)
        displayValue.value = helper.formatNumber(v.toString());
      else displayValue.value = "";
    },
    { immediate: true }
  );
</script>
