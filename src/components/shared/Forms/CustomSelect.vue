<template>
  <q-select
    v-model="value"
    outlined
    dense
    clearable
    emit-value
    map-options
    clear-icon="clear"
    class="text-body2"
    dropdown-icon="o_expand_more"
  />
</template>

<script setup>
const value = defineModel('value')
</script>
