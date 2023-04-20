<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white shadow-2">
      <q-toolbar>
        <q-avatar color="white" class="q-mx-sm" text-color="black">A</q-avatar>
        <q-separator dark vertical />

        <q-btn-dropdown stretch flat no-caps dropdown-icon="keyboard_arrow_down">
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <div>
                {{username}}
              </div>
            </div>
          </template>

          <q-list padding>
            <q-item-label class="text-h5" header>
              <q-avatar color="blue-4" class="q-mx-sm" text-color="white">A</q-avatar>
              {{username}}
            </q-item-label>
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-avatar icon="password" />
              </q-item-section>
              <q-item-section>
                <q-item-label>change password</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup tabindex="0" @click="authStore.logout()">
              <q-item-section avatar>
                <q-avatar icon="logout" />
              </q-item-section>
              <q-item-section>
                <q-item-label>logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-space />
        <div>Landa SME v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores'

  const authStore = useAuthStore()

  // if (!authStore.user) {
  //   authStore.logout()
  // }

  const username = computed(() => {
    if (authStore.user) return authStore.user.user.fullName
    return ''
  })

</script>