<template>
  <q-item-label v-if="label" class="caption-on-dark">
    {{ label }}
  </q-item-label>
</template>

<script setup>
  const props = defineProps({
    label: String,
  });
</script>
