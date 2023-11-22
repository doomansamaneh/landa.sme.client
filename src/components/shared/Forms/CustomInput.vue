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
  if (format === "n0" && value) {
    return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return value
}
</script>
