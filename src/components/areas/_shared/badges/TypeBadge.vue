<template>
  <q-badge v-if="title" class="primary-gradient">
    {{ title }}
  </q-badge>
</template>

<script setup>
  const props = defineProps({
    title: String,
  });
</script>
