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
    :rules="
      required
        ? [
            (val) =>
              (val && val.length > 0) || $t('shared.labels.required'),
          ]
        : []
    "
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
  import CustomLabel from "./CustomLabel.vue";

  const props = defineProps({
    label: String,
    placeholder: String,
    type: { type: String, default: "text" }, //Accepted values 'text''password''textarea''email''search''tel''file''number''url''time''date''datetime-local'
    required: Boolean,
    mask: String,
    clearable: Boolean,
    debounce: Number,
    maxlength: Number,
    disable: Boolean,
  });
  const modelValue = defineModel("modelValue");
</script>
