<template>
  <q-badge v-if="title" text-color="white" class="bluegrey-gradient">
    {{ title }}
    <q-tooltip class="custom-tooltip text-body1 no-letter-spacing">
      قرارداد
    </q-tooltip>
  </q-badge>
</template>

<script setup>
  const props = defineProps({
    title: String,
    id: String,
  });
</script>
