<template>
  <template v-if="$q.screen.xs">
    <mobile :title="title" />
  </template>
  <template v-else>
    <desktop :title="title" />
  </template>
</template>

<script setup>
  import Desktop from "../../desktop/index/DataGridContainer.vue";
  import Mobile from "../../mobile/index/DataGridContainer.vue";

  const props = defineProps({
    title: String,
  });
</script>
