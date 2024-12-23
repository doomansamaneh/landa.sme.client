<template>
  <custom-label :label="label" />
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
    hide-buttom-space
    :placeholder="placeholder"
    :rules="required ? [(val) => val !== null && val !== ''] : []"
  />
</template>

<script setup>
  import CustomLabel from "./CustomLabel.vue";

  const props = defineProps({
    label: String,
    placeholder: String,
    required: Boolean,
    options: Array,
  });
  const modelValue = defineModel("modelValue");
</script>
