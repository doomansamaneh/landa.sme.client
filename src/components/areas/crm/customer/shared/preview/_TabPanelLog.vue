<template>
  <mobile-comments v-if="$q.screen.xs" />
  <desktop-comments v-else bordered />
</template>

<script setup>
  import DesktopComments from "src/components/areas/cmn/product/desktop/comments/IndexView.vue";
  import MobileComments from "src/components/areas/cmn/product/mobile/comments/IndexView.vue";
</script>
