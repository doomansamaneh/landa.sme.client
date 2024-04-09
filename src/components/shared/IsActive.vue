<template>
  <q-btn
    v-if="isActive"
    round
    dense
    size="10px"
    unelevated
    icon="o_done"
    color="positive"
    class="no-pointer-events"
  />
  <q-btn
    v-else
    round
    dense
    size="10px"
    unelevated
    icon="o_close"
    color="negative"
    class="no-pointer-events"
  />
</template>

<script setup>
const props = defineProps({
  isActive: String,
});
</script>
