<template>
  test
  <mobile-log v-if="$q.screen.xs" />
  <desktop-log v-else bordered />
</template>

<script setup>
  import DesktopLog from "./_DesktopLog.vue";
  import MobileLog from "./_MobileLog.vue";

  const props = defineProps({
    entityId: String,
  });
</script>
