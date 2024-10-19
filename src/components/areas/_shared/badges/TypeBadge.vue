<template>
  <q-btn
    v-if="title"
    padding="0 4px"
    unelevated
    class="primary-gradient text-center text-caption-xs no-letter-spacing text-white border-radius-lg no-pointer-events"
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
