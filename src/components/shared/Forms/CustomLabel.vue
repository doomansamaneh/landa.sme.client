<template>
  <q-item-label
    v-if="label"
    class="q-mb-sm caption-on-dark no-letter-spacing"
  >
    {{ label }}
  </q-item-label>
</template>

<script setup>
  const props = defineProps({
    label: String,
  });
</script>
