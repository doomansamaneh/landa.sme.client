<template>
  <q-badge v-if="no" text-color="white" class="red-gradient">
    {{ no }}
  </q-badge>
</template>

<script setup>
  const props = defineProps({
    no: Number,
  });
</script>
