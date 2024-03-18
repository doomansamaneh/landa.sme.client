<template>
  <q-input v-model="model" outlined dense clear-icon="clear" />
</template>

<script setup>
const model = defineModel("value");
</script>
