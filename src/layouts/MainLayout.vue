<template>
  <q-layout view="hHh Lpr lff" class="layout">
    <q-page-container>
      <top-bar @toggle-drawer="toggleDrawer" />
      <side-bar />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useQuasar } from "quasar"
import { useRoute } from "vue-router"
import { useRouter } from "vue-router"
import { fetchWrapper } from "src/helpers"
import HomePage from "src/components/management/home/IndexView.vue"
import SideBar from "src/components/layouts/main/SideBar.vue"
import TopBar from "src/components/layouts/main/TopBar.vue"

import { useSelectedBusinessStore } from "src/stores/selected-business.js"

const route = useRoute()
const router = useRouter()
const $q = useQuasar()

const sideBar = ref(false)

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
  alert("drawer...")
}

//todo: remove this part to a global place such as composables or store
onMounted(() => {
  loadData()
  const darkModeisActive = localStorage.getItem("darkMode")
  if (darkModeisActive === "true") {
    $q.dark.set(true)
  }
})
</script>

<style lang="scss">
.layout {
  background-color: #f1f3f4;
  border-bottom: 1px solid #2d2d2d2d;
}

.q-menu {
  z-index: 9999;
}

.drawer {
  border-right: 1px solid rgb(219, 219, 219);
  border-left: none;
}

.q-focus-helper {
  display: none;
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

.language-main-layout.q-btn--actionable.q-btn--standard:before {
  box-shadow: none;
  border: 1px solid $primary;
}

// /* width */
// ::-webkit-scrollbar {
//   width: 10px;
// }

// /* Track */
// ::-webkit-scrollbar-track {
//   background: #f1f1f1;
//   border-radius: 10px;
// }

// /* Handle */
// ::-webkit-scrollbar-thumb {
//   background: #709dff;
//   border-radius: 10px;
// }

// /* Handle on hover */
// ::-webkit-scrollbar-thumb:hover {
//   background: #6797ff;
// }
</style>
