<template>
  <q-btn
    no-caps
    v-if="title"
    padding="0 8px"
    unelevated
    class="orange-gradient text-white text-center text-caption-xs border-radius-lg no-pointer-events"
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
