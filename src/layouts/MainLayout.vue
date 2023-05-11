<template>
  <q-layout view="rHh rpR fFf" container style="height: 100vh">
    <q-header class="bg-white text-black q-qx-md">
      <q-toolbar class="q-px-lg">
        <q-toolbar-title class="text-black"
          ><a href="#" class="navbar-logo">Landa-SME</a></q-toolbar-title
        >

        <div class="flex items-center q-gutter-sm cursor-pointer">
          <div class="text-body">{{ username }}</div>
          <q-icon color="dark" size="sm" name="o_account_circle" />
          <q-menu>
            <q-list dense padding style="min-width: 240px;" class="q-py-md">
              <q-item-label class="text-h5" header>
                <q-avatar color="blue-4" class="q-mx-sm" text-color="white"
                  >خ</q-avatar
                >
                {{ username }}
              </q-item-label>
              <q-item clickable v-ripple v-close-popup class="q-py-sm">
                <div class="q-py-sm">
                  <q-item-section avatar>
                  <q-avatar
                    color="grey-4"
                    text-color="dark"
                    icon="o_password"
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

    <!-- <q-header class="bg-white text-black q-qx-md">
      <q-toolbar class="q-px-lg">
        <q-toolbar-title class="text-black"
          ><a href="#" class="navbar-logo">Landa-SME</a></q-toolbar-title
        >

        <div class="flex items-center q-gutter-sm cursor-pointer">
          <div class="text-body">خشایار</div>
          <q-icon color="dark" size="sm" name="o_account_circle" />
        </div>
      </q-toolbar>
    </q-header> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores"

const authStore = useAuthStore()

// if (!authStore.user) {
//   authStore.logout()
// }

const username = computed(() => {
  if (authStore.user) return authStore.user.user.fullName
  return ""
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
