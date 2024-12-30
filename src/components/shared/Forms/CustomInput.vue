<template>
  <custom-label :label="label" />
  <q-input
    v-model="modelValue"
    outlined
    dense
    clear-icon="clear"
    hide-bottom-space
    :required="required"
    :disable="disable"
    :mask="mask"
    :type="type"
    :clearable="clearable"
    :debounce="debounce"
    :maxlength="maxlength"
    :placeholder="placeholder"
    lazy-rules
    :rounded="rounded"
    :rules="rules"
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
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";

  import CustomLabel from "./CustomLabel.vue";

  const { t } = useI18n();

  const props = defineProps({
    label: String,
    placeholder: String,
    type: { type: String, default: "text" }, // Accepted values: 'text', 'password', 'textarea', 'email', 'search', 'tel', 'file', 'number', 'url', 'time', 'date', 'datetime-local'
    required: Boolean,
    mask: String,
    clearable: Boolean,
    debounce: Number,
    maxlength: Number,
    disable: Boolean,
    rounded: Boolean,
  });

  const modelValue = defineModel("modelValue");
  
  const rules = computed(() => {
    return props.required
      ? [
          (val) =>
            (val && val.length > 0) || t("shared.labels.required"),
        ]
      : [];
  });
</script>
