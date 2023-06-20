<template>
  <q-layout>

    <alert-banner />

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
  import { useAuthStore } from '../stores'
  import AlertBanner from "src/components/shared/AlertBanner.vue"

  const authStore = useAuthStore()
  authStore.clearUser()
</script>