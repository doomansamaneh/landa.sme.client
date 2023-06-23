<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="text-black q-qx-md">
      <q-toolbar class="q-px-lg">
        <q-toolbar-title class="text-black"
          ><a href="#" class="navbar-logo">Landa-SME</a></q-toolbar-title
        >

        <div class="flex items-center q-gutter-x-xs cursor-pointer">
          <q-icon size="sm" name="o_account_circle" />
          <div class="text-body">{{ username }}</div>
          <q-menu
            fit
            class=""
            transition-show="jump-down"
            transition-hide="jump-up"
            :offset="[10, 28]"
          >
            <q-list dense padding class="user-profile">
              <div class="flex justify-between items-center q-pl-xs q-pr-md">
                <q-toggle
                  color="blue-8"
                  v-model="darkMode"
                  unchecked-icon="light_mode"
                  checked-icon="dark_mode"
                />
                <div class="q-gutter-x-xs">
                  <q-icon
                    name="circle"
                    size="xs"
                    color="primary"
                    class="cursor-pointer"
                    icon="format_paint"
                  />
                  <q-icon
                    name="circle"
                    size="xs"
                    color="green"
                    class="cursor-pointer"
                  />
                  <q-icon
                    name="circle"
                    size="xs"
                    color="red"
                    class="cursor-pointer"
                  />
                </div>
              </div>
              <q-item-label class="text-h6" header>
                <div class="column items-center justify-center q-mt-md">
                  <q-avatar
                    color="blue-4"
                    class="profile-pic q-mx-sm"
                    text-color="white"
                  >
                    <div class="text-weight-bold">
                      <span class="username">{{ getFirstChar(username) }}</span>
                    </div>
                  </q-avatar>
                  <div class="q-mt-md">
                    <span class="username">{{ username }}</span>
                  </div>
                </div>
              </q-item-label>
              <q-item
                clickable
                v-ripple
                v-close-popup
                class="q-mt-md"
                @click="goToChangePasswordPage"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar class="dark-icon" icon="o_password" size="md" />
                  </q-item-section>
                </div>

                <q-item-section>{{
                  $t("business-layout.buttons.change-password")
                }}</q-item-section>
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
                    <q-avatar class="dark-icon" icon="logout" size="md" />
                  </q-item-section>
                </div>
                <q-item-section>{{
                  $t("business-layout.buttons.logout")
                }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <alert-banner />
  </q-layout>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted, watch } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores"
import AlertBanner from "src/components/shared/AlertBanner.vue"
import { useQuasar } from "quasar"

const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

const darkMode = ref(false)

const username = computed(() => {
  if (authStore.user) return authStore.user.user.fullName
  return ""
})

function goToChangePasswordPage() {
  router.push("/business/changePassword")
}

function getFirstChar(str) {
  return str.charAt(0)
}

watch(darkMode, (newVal) => {
  $q.dark.set(newVal ? "auto" : false)
  localStorage.setItem("darkMode", newVal)
})

onMounted(() => {
  const darkModeisActive = localStorage.getItem("darkMode")
  if (darkModeisActive === "true") {
    darkMode.value = true
  }
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
.user-profile {
  min-width: 240px;
}

.profile-pic {
  width: 72px;
  height: 72px;
}
</style>
