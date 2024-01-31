<template>
  <q-page :class="$q.screen.gt.xs ? 'row items-center justify-center overflow-hidden' : ''">
    <div class="main-container">
      <template v-if="$q.screen.gt.xs">
        <business-background />
        <desktop-view />
      </template>

      <template v-if="$q.screen.xs">
        <mobile-view v-if="$q.screen.xs" />
      </template>
    </div>

  </q-page>
</template>

<script setup>
import DesktopView from "src/components/management/business/desktop/IndexView.vue"
import MobileView from "src/components/management/business/mobile/IndexView.vue"
import BusinessBackground from "src/assets/BusinessBackground.vue"
</script>
