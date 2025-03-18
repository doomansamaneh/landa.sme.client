<template>
  <q-layout view="hHh Lpr fFf" class="main-layout">
    <q-page-container>
      <router-view />
    </q-page-container>

    <header-mobile v-if="$q.screen.xs" />
    <header-desktop v-else />

    <bottom-navigation />
    <menu-bar />
    <contact-drawer />
    <notif-drawer />
    <alert-banner class="fixed-bottom z-max" />
  </q-layout>
</template>

<script setup>
  import { onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { useTheme } from "src/components/layouts/main/_composables/useTheme.js";
  import { useMenuBar } from "src/composables/useMenuBar";

  import MenuBar from "src/components/layouts/main/MenuBar.vue";
  import ContactDrawer from "src/components/layouts/main/ContactDrawer.vue";
  import NotifDrawer from "src/components/layouts/main/NotifDrawer.vue";
  import HeaderDesktop from "src/components/layouts/main/desktop/MainHeader.vue";
  import HeaderMobile from "src/components/layouts/main/mobile/MainHeader.vue";
  import BottomNavigation from "src/components/layouts/main/mobile/BottomNavigation.vue";
  import AlertBanner from "src/components/shared/AlertBanner.vue";

  const theme = useTheme();
  const $q = useQuasar();
  const MenuBarStore = useMenuBar();

  if ($q.screen.lt.md) {
    MenuBarStore.state.visible.value = false;
  }

  onMounted(() => {
    theme.store();
  });
</script>
