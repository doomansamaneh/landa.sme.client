<template>
  <q-item-label
    v-if="label"
    class="caption-on-dark no-letter-spacing"
  >
    {{ label }}
  </q-item-label>
</template>

<script setup>
  const props = defineProps({
    label: String,
  });
</script>
