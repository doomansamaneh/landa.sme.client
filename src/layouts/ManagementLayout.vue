<template>
  <q-layout view="hHh lpR fFf">
    <desktop-header v-if="$q.screen.gt.xs" />
    <mobile-header v-else />

    <q-page-container>
      <router-view />
    </q-page-container>

    <alert-banner class="fixed-bottom z-max" />

    <!-- todo: How to remove switch-language from layouts
        Find a way to load switch-language in layout -->
    <switch-language style="visibility: hidden" />
  </q-layout>
</template>

<script setup>
  import AlertBanner from "src/components/shared/AlertBanner.vue";
  import DesktopHeader from "src/components/layouts/management/desktop/header/IndexView.vue";
  import MobileHeader from "src/components/layouts/management/mobile/header/IndexView.vue";

  import SwitchLanguage from "src/components/shared/SwitchLanguage.vue";
</script>
