<template>
  <custom-label class="q-mb-sm" :label="label" />
  <q-select
    v-model="modelValue"
    :options="options"
    outlined
    dense
    clearable
    emit-value
    map-options
    clear-icon="clear"
    class="text-body2"
    dropdown-icon="o_expand_more"
    hide-bottom-space
    :placeholder="placeholder"
    :rules="rules"
  >
    <validation-alert
      v-if="validationMessage"
      :message="validationMessage"
    />
  </q-select>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useI18n } from "vue-i18n";

  import CustomLabel from "./CustomLabel.vue";
  import ValidationAlert from "./ValidationAlert.vue";

  const { t } = useI18n();

  const props = defineProps({
    label: String,
    placeholder: String,
    required: Boolean,
    options: Array,
    rules: Array,
  });
  const modelValue = defineModel("modelValue");
  const validationMessage = ref("");

  const rules = computed(() => {
    return props.required
      ? [
          (val) => {
            const valid = val !== null;
            validationMessage.value = valid
              ? ""
              : t("shared.labels.required");
            return valid;
          },
        ]
      : [];
  });
</script>
