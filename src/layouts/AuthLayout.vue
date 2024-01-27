<template>
  <q-layout
    view="lHh lpr lFf"
    class="auth-layout"
    :class="[$q.screen.gt.xs ? 'auth-layout' : 'bg-dark']"
  >
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <alert-banner class="fixed-bottom z-max" />
</template>

<script setup>
import { useAuthStore } from "../stores"
import AlertBanner from "src/components/shared/AlertBanner.vue"

const authStore = useAuthStore()
authStore.clearUser()

</script>

