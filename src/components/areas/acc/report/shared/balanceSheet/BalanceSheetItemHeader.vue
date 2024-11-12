<template>
  <q-item-label
    header
    class="bg-on-dark border-radius-sm"
    style="padding: 12px"
  >
    <span class="text-body1 text-on-dark text-weight-600">
      {{ title }}
    </span>
  </q-item-label>
</template>

<script setup>
  const props = defineProps({
    title: String,
  });
</script>
