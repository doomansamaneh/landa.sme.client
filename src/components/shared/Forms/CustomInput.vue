<template>
  <custom-label :label="label" />
  <q-input
    v-model="modelValue"
    outlined
    dense
    clear-icon="clear"
    hide-bottom-space
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
    <validation-alert
      v-if="validationMessage"
      :message="validationMessage"
    />

    <template #prepend>
      <slot name="prepend"></slot>
    </template>
    <template #append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { useI18n } from "vue-i18n";

  import CustomLabel from "./CustomLabel.vue";
  import ValidationAlert from "./ValidationAlert.vue";

  const { t } = useI18n();

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
    rounded: Boolean,
  });

  const modelValue = defineModel("modelValue");
  const validationMessage = ref("");

  const rules = computed(() => {
    return props.required
      ? [
          (val) => {
            const valid = !!val;
            validationMessage.value = valid
              ? ""
              : t("shared.labels.required");
            return valid;
          },
        ]
      : [];
  });
</script>
