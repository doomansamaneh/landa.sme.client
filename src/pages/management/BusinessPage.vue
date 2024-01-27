<template>
  <q-page :class="$q.screen.gt.xs ? 'row items-center justify-center overflow-hidden' : '' ">

    <div class="main-container">

     <business-background v-if="$q.screen.gt.xs" />

      <desktop-view v-if="$q.screen.gt.xs" />
      <mobile-view v-if="$q.screen.xs" />
    </div>
  </q-page>
</template>

<script setup>
import DesktopView from "src/components/management/business/desktop/IndexView.vue"
import MobileView from "src/components/management/business/mobile/IndexView.vue"
import BusinessBackground from "src/assets/BusinessBackground.vue"
</script>
