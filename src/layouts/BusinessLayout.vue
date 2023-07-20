<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="text-black">
      <q-toolbar class="q-px-lg">
        <q-toolbar-title class="text-black"
          ><a href="#" class="navbar-logo">Landa-SME</a></q-toolbar-title
        >
        <div class="flex q-gutter-x-md">
          <switch-theme />

          <div class="flex items-center q-gutter-x-xs cursor-pointer">
            <q-icon size="sm" name="o_account_circle" />
            <div class="text-body">{{ username }}</div>
            <q-menu
              fit
              class="no-shadow"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[10, 28]"
            >
              <q-list dense padding class="user-profile">
                <q-item-label class="text-h6" header>
                  <div class="column items-center justify-center q-mt-md">
                    <q-avatar
                      class="profile-pic q-mx-sm bg-primary"
                      text-color="white"
                    >
                      <div class="text-weight-bold">
                        <span class="username">{{
                          getFirstChar(username)
                        }}</span>
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
        </div>
      </q-toolbar>
      <div class="bread-crumbs q-py-sm q-px-lg">
        <bread-crumbs />
      </div>
    </q-header>

    <q-page-container>
      <q-page class="flex justify-center items-center full-screen">
        <router-view />
        <q-dialog
          v-model="changePasswordPopup"
          transition-show="slide-down"
          transition-hide="fade"
          transition-duration="600"
        >
          <reset-password>
            <template #header>
              <q-item-section>
                <q-item-label class="text-bold">{{
                  $t("change-password-page.title")
                }}</q-item-label>
              </q-item-section>
              <q-card-actions>
                <div class="flex items-center q-gutter-x-md">
                  <q-icon
                    class="icon-hover dark-3 cursor-pointer"
                    size="xs"
                    name="close"
                    @click="close"
                    v-close-popup
                  >
                    <q-tooltip class="custom-tooltip">{{
                      $t("change-password-page.buttons.close")
                    }}</q-tooltip>
                  </q-icon>
                </div>
              </q-card-actions>
            </template>
          </reset-password>
        </q-dialog>
      </q-page>
    </q-page-container>

    <alert-banner />
  </q-layout>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted, watch } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores"
import AlertBanner from "src/components/shared/AlertBanner.vue"
import SwitchTheme from "src/components/shared/SwitchTheme.vue"
import BreadCrumbs from "src/components/shared/BreadCrumbs.vue"
import ResetPassword from "src/components/users/ResetPassword.vue"

const router = useRouter()
const authStore = useAuthStore()

const changePasswordPopup = ref(false)

const username = computed(() => {
  if (authStore.user) return authStore.user.user.fullName
  return ""
})

function goToChangePasswordPage() {
  changePasswordPopup.value = true // Open the dialog
  // router.push("/business/changePassword") // Change the route
}

// function close() {
//   router.go(-1)
// }

function getFirstChar(str) {
  return str.charAt(0)
}
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

.q-breadcrumbs__el.items-center {
  display: block;
}
</style>
