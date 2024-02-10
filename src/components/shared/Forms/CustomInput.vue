<template>
  <q-input
    v-model="value"
    outlined
    dense
    clear-icon="clear"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(['displayFormat']);
const value = defineModel('value')

// const value = computed({
//   get: () => formatValue(props.modelValue, props.displayFormat),
//   set: (newValue) => {
//     emit('update:modelValue', formatValue(newValue, props.displayFormat))
//   }
// })

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
