<template>
  <q-btn
    no-caps
    v-if="no"
    padding="0 8px"
    unelevated
    class="red-gradient text-white text-center text-caption-xs border-radius-lg no-pointer-events"
    style="white-space: nowrap"
  >
    {{ no }}
  </q-btn>
</template>

<script setup>
  const props = defineProps({
    no: Number,
  });
</script>
