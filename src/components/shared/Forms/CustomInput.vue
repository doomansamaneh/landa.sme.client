<template>
  <q-input v-model="model" outlined dense clear-icon="clear">
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script setup>
  const model = defineModel("value");
</script>
