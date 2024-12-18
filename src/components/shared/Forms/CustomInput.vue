<template>
  <div v-if="label" class="q-mb-sm caption-on-dark no-letter-spacing">
    {{ label }}
  </div>

  <q-input
    v-model="model"
    outlined
    dense
    clear-icon="clear"
    :type="type"
  >
    <template #prepend>
      <slot name="prepend"></slot>
    </template>
    <template #append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script setup>
  const model = defineModel("value");

  const props = defineProps({
    label: String,
    type: String,
  });
</script>
