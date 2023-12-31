<template>
  <desktop-header
    v-if="$q.screen.gt.xs"
  />
  <mobile-header
    v-if="$q.screen.xs"
  />
</template>

<script setup>
import MobileHeader from "src/components/layouts/main/mobile/MainHeader.vue"
import DesktopHeader from "src/components/layouts/main/desktop/MainHeader.vue"
</script>



