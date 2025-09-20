<template>
  <custom-label class="q-mb-sm" :label="label" />
  <q-input
    v-model="modelValue"
    outlined
    dense
    clear-icon="clear"
    :input-class="inputClass"
    color="primary"
    hide-bottom-space
    :disable="disable"
    :readonly="readonly"
    :mask="mask"
    :type="type"
    :clearable="clearable"
    :debounce="debounce"
    :maxlength="maxlength"
    :placeholder="placeholder"
    lazy-rules
    :rounded="rounded"
    :rules="rules"
    :autogrow="autogrow"
    :inputmode="inputmode"
    @keydown="$emit('keydown', $event)"
    @clear="$emit('clear')"
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
  import { computed, ref, useSlots } from "vue";
  import { useI18n } from "vue-i18n";

  import CustomLabel from "./CustomLabel.vue";
  import ValidationAlert from "./ValidationAlert.vue";

  const props = defineProps({
    label: String,
    placeholder: String,
    type: { type: String, default: "text" },
    required: Boolean,
    mask: String,
    clearable: Boolean,
    debounce: Number,
    maxlength: Number,
    disable: Boolean,
    readonly: Boolean,
    rounded: Boolean,
    autogrow: Boolean,
    inputmode: String,
    dense: Boolean,
    inputClass: String,
  });

  const modelValue = defineModel("modelValue");
  const { t } = useI18n();
  const slots = useSlots();
  const validationMessage = ref("");

  const rules = computed(() => {
    return props.required
      ? [
          (val) => {
            const valid =
              val !== null && val !== undefined && val !== "";
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
</script>
