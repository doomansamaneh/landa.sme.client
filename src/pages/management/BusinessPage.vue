<template>
  <div class="main-container">
   <div class="row items-center justify-center">
    <desktop-view v-if="$q.screen.gt.xs" />
   </div>
    <mobile-view v-if="$q.screen.xs" />
  </div>
</template>

<script setup>
import DesktopView from "src/components/management/business/desktop/IndexView.vue"
import MobileView from "src/components/management/business/mobile/IndexView.vue"
</script>
