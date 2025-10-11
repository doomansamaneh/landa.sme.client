<template>
  <q-layout view="hHh lpR fFf">
    <desktop-header v-if="$q.screen.gt.xs" />
    <mobile-header v-else />

    <q-page-container>
      <router-view />
    </q-page-container>

    <alert-banner class="fixed-bottom z-max" />
    <welcome-back-dialog />
    <anniversary-dialog />
  </q-layout>
</template>

<script setup>
  import AlertBanner from "src/components/shared/AlertBanner.vue";
  import DesktopHeader from "src/components/layouts/management/desktop/header/IndexView.vue";
  import MobileHeader from "src/components/layouts/management/mobile/header/IndexView.vue";
  import WelcomeBackDialog from "src/components/shared/WelcomeBackDialog.vue";
  import AnniversaryDialog from "src/components/shared/AnniversaryDialog.vue";
</script>
