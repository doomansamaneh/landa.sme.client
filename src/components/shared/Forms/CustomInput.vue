<template>
  <q-input
    v-model="value"
    outlined
    dense
    :clearable="clearable"
    clear-icon="clear"
    :label="label"
    :placeholder="placeholder"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(['modelValue', 'placeholder', 'label', 'displayFormat', 'clearable']);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => formatValue(props.modelValue, props.displayFormat),
  set: (newValue) => {
    emit('update:modelValue', formatValue(newValue, props.displayFormat))
  }
})

function formatValue(value, format) {
  // if (guard(value, format)) {
  //   const stringValue = String(value);
  //   return stringValue.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // }
  return value;
}

function guard(value, format) {
  return value
    && format === "n0"
}
</script>
