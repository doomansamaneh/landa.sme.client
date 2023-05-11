<template>
  <q-layout view="hHh lpR fFf">
    <!-- <q-header elevated class="bg-teal text-white shadow-2">
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

          <q-list dense padding style="min-width: 240px">
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
    </q-header> -->

    <q-header class="bg-white text-black q-qx-md">
      <q-toolbar class="q-px-lg">
        <q-toolbar-title class="text-black"
          ><a href="#" class="navbar-logo">Landa-SME</a></q-toolbar-title
        >

        <div class="flex items-center q-gutter-sm cursor-pointer">
          <div class="text-body">{{username}}</div>
          <q-icon color="dark" size="sm" name="o_account_circle" />
          <q-menu>
            <q-list dense padding style="min-width: 240px" class="q-py-md">
              <q-item-label class="text-h5" header>
                <q-avatar color="blue-4" class="q-mx-sm" text-color="white"
                  >خ</q-avatar
                >
                {{ username }}
              </q-item-label>
              <q-item clickable v-ripple v-close-popup class="">
                <div class="q-py-sm">
                  <q-item-section avatar>
                  <q-avatar
                    color="grey-4"
                    text-color="dark"
                    icon="password"
                    size="md"
                  />
                </q-item-section>
                </div>
                <q-item-section>Change Password</q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                tabindex="0"
                @click="authStore.logout()"
                class="q-py-sm"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                  <q-avatar
                    color="grey-4"
                    text-color="dark"
                    icon="logout"
                    size="md"
                  />
                </q-item-section>
                </div>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script setup>
  import { ref, computed } from 'vue'
  import { useAuthStore } from '../stores'

  const authStore = useAuthStore()

  const username = computed(() => {
    if (authStore.user) return authStore.user.user.fullName
    return ''
  })
</script>

<style>
.q-toolbar__title {
  font-size: 14px;
  font-weight: 600;
}
.navbar-logo {
  text-decoration: none;
  color: black;
}
</style>
