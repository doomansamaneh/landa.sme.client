<template>
  <q-layout
    view="hHh Lpr fFf"
  >
    <q-page-container>
      <router-view />
    </q-page-container>

    <alert-banner class="fixed-bottom z-max" />
  </q-layout>
</template>

<script setup>
import { onMounted } from "vue"
import { useTheme } from "src/components/layouts/main/_composables/ThemeStore.js"

import AlertBanner from "src/components/shared/AlertBanner.vue"

const theme = useTheme()

onMounted(() => {
  theme.store()
})

</script>
