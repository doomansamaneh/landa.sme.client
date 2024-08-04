<template>
  <q-layout view="hHh Lpr fFf" class="main-layout">
    <q-page-container>
      <router-view />
    </q-page-container>

    <header-mobile v-if="$q.screen.xs" />
    <header-desktop v-if="$q.screen.gt.xs" />

    <bottom-navigation />
    <menu-bar />
    <!-- v-if="menuBarStore.state.visible.value" -->
    <contact-drawer />
    <!-- v-if="contactDrawerStore.state.value" -->
    <notif-drawer />
    <alert-banner class="fixed-bottom z-max" />
  </q-layout>
</template>

<script setup>
  import { onMounted } from "vue";
  import { useQuasar } from "quasar";
  //import { useSelectedBusinessStore } from "src/stores/selected-business.js";
  import { useTheme } from "src/components/layouts/main/_composables/useTheme.js";
  import { useMenuBar } from "src/composables/useMenuBar";
  import { useContactDrawer } from "src/composables/useContactDrawer";

  import MenuBar from "src/components/layouts/main/MenuBar.vue";
  import ContactDrawer from "src/components/layouts/main/ContactDrawer.vue";
  import NotifDrawer from "src/components/layouts/main/NotifDrawer.vue";
  import HeaderDesktop from "src/components/layouts/main/desktop/MainHeader.vue";
  import HeaderMobile from "src/components/layouts/main/mobile/MainHeader.vue";
  import BottomNavigation from "src/components/layouts/main/mobile/BottomNavigation.vue";
  import AlertBanner from "src/components/shared/AlertBanner.vue";

  const theme = useTheme();
  //const route = useRoute();
  const $q = useQuasar();

  //const selectedBusiness = useSelectedBusinessStore();
  const menuBarStore = useMenuBar();
  const contactDrawerStore = useContactDrawer();

  // async function loadData() {
  //   const businessId = route.params.businessId;
  //   if (businessId)
  //     await fetchWrapper
  //       .get(`business/GetBusiness/${businessId}`)
  //       .then((response) => {
  //         handleBusinessData(response.data.data);
  //       });
  // }

  // function handleBusinessData(data) {
  //   localStorage.setItem("businessTitle", data.title);
  //   const businessTitle = localStorage.getItem("businessTitle");
  //   selectedBusiness.title = businessTitle;
  // }

  onMounted(() => {
    //loadData();
    theme.store();
  });

  if ($q.screen.lt.md) {
    menuBarStore.state.visible.value = false;
  }
</script>

<style lang="scss">
  .q-menu {
    z-index: 9999;
  }

  .user-profile {
    min-width: 240px;
    border: 1px solid #2d2d2d2d;
    border-radius: inherit;
  }

  .user-setting {
    min-width: 240px;
    min-height: 400px;
    border: 1px solid #2d2d2d2d;
    border-radius: inherit;
  }

  .q-item__section--avatar {
    min-width: 0;
  }
</style>
