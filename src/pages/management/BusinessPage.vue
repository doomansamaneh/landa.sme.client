<template>
  <desktop-view class="desktop" />
  <mobile-view />
</template>

<script setup>
  import { useQuasar } from 'quasar'
  import DesktopView from "src/components/management/business/desktop/IndexView.vue"
  import MobileView from "src/components/management/business/mobile/IndexView.vue"
</script>