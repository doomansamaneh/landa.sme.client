<template>
  <q-badge v-if="title" text-color="white" class="bluegrey-gradient">
    {{ title }}
  </q-badge>
</template>

<script setup>
  const props = defineProps({
    title: String,
  });
</script>
