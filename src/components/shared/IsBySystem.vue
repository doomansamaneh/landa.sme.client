<template>
  <q-icon
    v-if="isBySystem"
    size="15px"
    name="o_lock"
    color="secondary"
    title="سیستمی"
  />
</template>

<script setup>
const props = defineProps({
  isBySystem: Boolean,
});
</script>
