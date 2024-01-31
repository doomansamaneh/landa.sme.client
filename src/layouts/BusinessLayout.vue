<template>
  <q-layout view="hHh lpR fFf">
    <desktop-header v-if="$q.screen.gt.xs" />
    <mobile-header v-else />

    <q-page-container>
      <router-view />
    </q-page-container>

    <alert-banner class="fixed-bottom z-max" />
  </q-layout>
</template>

<script setup>
import AlertBanner from "src/components/shared/AlertBanner.vue"
import DesktopHeader from "src/components/layouts/business/desktop/header/IndexView.vue"
import MobileHeader from "src/components/layouts/business/mobile/header/IndexView.vue"
</script>


