<template>
  <q-select
    v-model="value"
    outlined
    dense
    clearable
    emit-value
    clear-icon="clear"
    :label="label"
    :placeholder="placeholder"
    class="text-caption"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(['modelValue', 'placeholder', 'label']);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})
</script>
