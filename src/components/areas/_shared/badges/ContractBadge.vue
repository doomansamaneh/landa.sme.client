<template>
  <q-btn
    no-caps
    v-if="title"
    padding="0 8px"
    unelevated
    class="bluegrey-gradient text-center text-caption-xs text-white border-radius-lg no-pointer-events"
    style="white-space: nowrap"
  >
    {{ title }}
    <q-tooltip class="custom-tooltip text-body1">قرارداد</q-tooltip>
  </q-btn>
</template>

<script setup>
  const props = defineProps({
    title: String,
    id: String,
  });
</script>
