<template>
  <q-badge v-if="title" class="bg-orange-2 text-red">
    {{ title }}
  </q-badge>
</template>

<script setup>
  const props = defineProps({
    title: String,
  });
</script>
