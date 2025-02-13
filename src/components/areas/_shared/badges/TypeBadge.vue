<template>
  <q-btn
    v-if="title"
    padding="0 8px"
    unelevated
    class="primary-gradient text-center text-caption-xs text-white border-radius-lg no-pointer-events"
    style="white-space: nowrap"
  >
    {{ title }}
  </q-btn>
</template>

<script setup>
  const props = defineProps({
    title: String,
  });
</script>
