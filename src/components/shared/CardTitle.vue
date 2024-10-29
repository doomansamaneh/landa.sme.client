<template>
  <q-card-section class="text-center">
    <h6
      class="text-h6 text-on-dark text-weight-700 no-letter-spacing"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </h6>
  </q-card-section>
  <q-separator />
</template>

<script setup>
  const props = defineProps({
    title: String,
  });
</script>
