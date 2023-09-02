<template>
  <q-layout
    view="hHh Lpr lff"
    class="main-layout-color"
  >
    <q-page-container>
      <home-page />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted } from "vue"
import { useQuasar } from "quasar"
import HomePage from "src/components/management/home/IndexView.vue"

const $q = useQuasar()

//todo: remove this part to a global place such as composables or store
onMounted(() => {
  const darkModeisActive = localStorage.getItem("darkMode")
  if (darkModeisActive === "true") {
    $q.dark.set(true)
  }
})
</script>

<style lang="scss">
.main-layout-color {
  background-color: #ffffff;
  border-bottom: 1px solid #2d2d2d2d;
}

.q-menu {
  z-index: 9999;
}

.lang-switcher.q-btn--actionable.q-btn--standard:before {
  border: 1px solid $primary;
  box-shadow: none;
}
</style>
