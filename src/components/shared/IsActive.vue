<template>
  <q-btn
    v-if="isActive"
    round
    dense
    size="10px"
    unelevated
    icon="o_done"
    text-color="white"
    class="green-gradient green-shadow no-pointer-events"
  />
  <q-btn
    v-else
    round
    dense
    size="10px"
    unelevated
    icon="o_close"
    text-color="white"
    class="red-gradient red-shadow no-pointer-events"
  />
</template>

<script setup>
  const props = defineProps({
    isActive: Boolean,
  });
</script>
