<template>
  <q-layout
    view="hHh Lpr lff"
    class="main-layout"
  >
    <q-page-container>
      <main-header @toggle-drawer="toggleDrawer" />
      <menu-bar :drawer="drawer" />
    <today-date />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { fetchWrapper } from "src/helpers"
import { useSelectedBusinessStore } from "src/stores/selected-business.js"
import { useTheme } from "src/components/layouts/main/_composables/ThemeStore.js"
import MenuBar from "src/components/layouts/main/MenuBar.vue"
import MainHeader from "src/components/layouts/main/MainHeader.vue"
import TodayDate from "src/components/shared/TodayDate.vue"

const theme = useTheme()
const route = useRoute()

const drawer = ref(true)

const selectedBusiness = useSelectedBusinessStore()

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

function toggleDrawer() {
  drawer.value = !drawer.value
}

onMounted(() => {
  loadData()
  theme.store()
})

</script>

<style lang="scss">
// .layout {
//   background-color: #f1f3f4;
//   border-bottom: 1px solid #2d2d2d2d;
// }

.q-menu {
  z-index: 9999;
}

// .q-focus-helper {
//   display: none;
// }

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
