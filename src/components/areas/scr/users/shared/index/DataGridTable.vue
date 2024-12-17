<template>
  <template v-if="$q.screen.xs">
    <mobile />
  </template>
  <template v-else>
    <desktop />
  </template>
</template>

<script setup>
  import Desktop from "../../desktop/index/DataGridContainer.vue";
  import Mobile from "../../mobile/index/DataGridContainer.vue";
</script>
