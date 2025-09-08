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

    <tutorial-checklist v-if="showChecklist" />
    <!-- v-if="
    !congratsStore.confetti.value &&
    !congratsStore.congratsDialog.value
    " -->
    <tutorial-congrats-dialog />
  </q-layout>
</template>

<script setup>
  import { ref, onBeforeUnmount, onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { useTheme } from "src/components/layouts/main/_composables/useTheme.js";
  import { useMenuBar } from "src/composables/useMenuBar";
  import { useCongrats } from "src/composables/useCongrats";
  import { useTutorialChecklist } from "src/composables/useTutorialChecklist";

  import MenuBar from "src/components/layouts/main/MenuBar.vue";
  import ContactDrawer from "src/components/layouts/main/ContactDrawer.vue";
  import NotifDrawer from "src/components/layouts/main/NotifDrawer.vue";
  import HeaderDesktop from "src/components/layouts/main/desktop/MainHeader.vue";
  import HeaderMobile from "src/components/layouts/main/mobile/MainHeader.vue";
  import BottomNavigation from "src/components/layouts/main/mobile/BottomNavigation.vue";
  import AlertBanner from "src/components/shared/AlertBanner.vue";
  import TutorialChecklist from "src/components/shared/TutorialChecklist.vue";
  import TutorialCongratsDialog from "src/components/shared/TutorialCongratsDialog.vue";

  const theme = useTheme();
  const $q = useQuasar();
  const menuBarStore = useMenuBar();
  const congratsStore = useCongrats();
  const showChecklist = ref(true);
  const tutorialStore = useTutorialChecklist();

  function onFinished() {
    showChecklist.value = false;
  }

  if ($q.screen.lt.md) {
    menuBarStore.state.visible.value = false;
  }

  onMounted(() => {
    theme.store();
    if (tutorialStore.isFinished.value) {
      showChecklist.value = false;
    }
    window.addEventListener(
      "tutorial-checklist-finished",
      onFinished
    );
  });

  onBeforeUnmount(() => {
    window.removeEventListener(
      "tutorial-checklist-finished",
      onFinished
    );
  });
</script>
