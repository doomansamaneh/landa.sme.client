<template>
  <q-select
    v-model="value"
    outlined
    dense
    clearable
    emit-value
    map-options
    clear-icon="clear"
    class="text-caption"
  />
</template>

<script setup>
const value = defineModel('value')
</script>
