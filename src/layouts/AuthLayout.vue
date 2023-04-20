<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { useAuthStore } from '../stores'
  const authStore = useAuthStore()
  authStore.clearUser()
</script>