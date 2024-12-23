<template>
  <custom-label :label="label" />
  <q-input
    v-model="modelValue"
    outlined
    dense
    clear-icon="clear"
    hide-buttom-space
    :mask="mask"
    :type="type"
    :clearable="clearable"
    :debounce="debounce"
    :placeholer="placeholder"
    :rules="required ? [(val) => val !== null && val !== ''] : []"
  >
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script setup>
  import CustomLabel from "./CustomLabel.vue";

  const props = defineProps({
    label: String,
    placeholder: String,
    type: { type: String, default: "text" },
    required: Boolean,
    mask: String,
    clearable: Boolean,
    debounce: Number,
  });
  const modelValue = defineModel("modelValue");
</script>
