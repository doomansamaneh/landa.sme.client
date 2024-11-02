<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile />
  </template>
  <template v-else>
    <toolbar-desktop />
  </template>
</template>

<script setup>
  import ToolbarMobile from "./_ToolbarMobile.vue";
  import ToolbarDesktop from "./_ToolbarDesktop.vue";
</script>
