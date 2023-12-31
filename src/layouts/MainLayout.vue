<template>
  <q-layout
    view="hHh Lpr fFf"
    class="main-layout"
  >
    <q-page-container>
      <main-header />
      <bottom-navigation />
      <menu-bar v-if="menuBarStore.state.value" />
      <contact-drawer v-if="contactDrawerStore.state.value" />
      <router-view />
    </q-page-container>

    <alert-banner class="fixed-bottom z-max" />

  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useQuasar } from "quasar"
import { fetchWrapper } from "src/helpers"
import { useSelectedBusinessStore } from "src/stores/selected-business.js"
import { useTheme } from "src/components/layouts/main/_composables/ThemeStore.js"
import MenuBar from "src/components/layouts/main/MenuBar.vue"
import MenuBarV2 from "src/components/layouts/main/MenuBarV2.vue"
import contactDrawer from "src/components/layouts/main/ContactDrawer.vue"
import MainHeader from "src/components/layouts/main/MainHeader.vue"
import BottomNavigation from "src/components/layouts/main/mobile/BottomNavigation.vue"
import TodayDate from "src/components/shared/TodayDate.vue"
import { useContactDrawer } from "src/composables/useContactDrawer"
import { useMenuBar } from "src/composables/useMenuBar"
import AlertBanner from "src/components/shared/AlertBanner.vue"

const theme = useTheme()
const route = useRoute()
const $q = useQuasar()

const selectedBusiness = useSelectedBusinessStore()
const contactDrawerStore = useContactDrawer()
const menuBarStore = useMenuBar()

async function loadData() {
  const businessId = route.params.businessId
  if (businessId)
    await fetchWrapper
      .get(`business/GetBusiness/${businessId}`)
      .then((response) => {
        handleBusinessData(response.data.data)
      })
}

function handleBusinessData(data) {
  localStorage.setItem("businessTitle", data.title)
  const businessTitle = localStorage.getItem("businessTitle")
  selectedBusiness.title = businessTitle
}

onMounted(() => {
  loadData()
  theme.store()
})

if (route.path === '/sls/invoice2/create') {
  menuBarStore.state.value = false;
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
