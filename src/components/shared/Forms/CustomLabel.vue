<template>
  <div v-if="label" class="q-mb-sm caption-on-dark no-letter-spacing">
    {{ label }}
  </div>
</template>

<script setup>
  const props = defineProps({
    label: String,
  });
</script>
