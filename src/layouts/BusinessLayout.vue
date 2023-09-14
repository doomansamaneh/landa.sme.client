<template>
  <q-layout
    view="hHh lpR fFf"
    class="business-layout"
  >
    <q-header
      class="text-black"
      bordered
    >
      <q-toolbar class="q-px-lg row justify-between">
        <div class="">
          <a
            href="https://landa-sme.ir"
            target="blank"
            class="row items-center navbar-logo"
          ><img
              class="logo"
              src="/landa-sme-logo.png"
              alt="landa-sme"
            /></a>
        </div>
        <div class="flex q-gutter-x-md">
          <q-separator
            vertical
            inset
          />
          <div class="row items-center q-pr-sm">
            <switch-theme />
          </div>
          <q-separator
            vertical
            inset
          />
          <div class="flex items-center q-gutter-x-xs cursor-pointer">
            <q-icon
              size="sm"
              name="o_account_circle"
            />
            <div class="text-body">{{ username }}</div>
            <q-menu
              fit
              class="no-shadow"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[10, 28]"
            >
              <q-list
                dense
                padding
                class="user-profile"
              >
                <q-item-label
                  class="text-h6"
                  header
                >
                  <div class="column items-center justify-center q-mt-md">
                    <q-avatar
                      class="profile-pic q-mx-sm"
                      text-color="white"
                    >
                      <div class="text-bold">
                        <span class="">{{
                          getFirstChar(username)
                        }}</span>
                      </div>
                    </q-avatar>
                    <div class="q-mt-md">
                      <span class="text-on-dark">{{ username }}</span>
                    </div>
                  </div>
                </q-item-label>
                <q-item
                  clickable
                  v-ripple
                  v-close-popup
                  class="q-mt-md"
                  @click="changePasswordDialog"
                >
                  <div class="q-py-sm">
                    <q-item-section avatar>
                      <q-avatar
                        class="dark-icon"
                        icon="o_password"
                        size="md"
                      />
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
                      <q-avatar
                        class="dark-icon"
                        icon="logout"
                        size="md"
                      />
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
      <bread-crumbs />
    </q-header>

    <q-page-container>
      <q-page class="flex justify-center items-center full-screen">
        <router-view />
      </q-page>
    </q-page-container>

    <alert-banner />
  </q-layout>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"
import { useAuthStore } from "src/stores"
import AlertBanner from "src/components/shared/AlertBanner.vue"
import SwitchTheme from "src/components/shared/SwitchTheme.vue"
import BreadCrumbs from "src/components/shared/BreadCrumbs.vue"
import ChangePasswordDialog from "src/components/users/ChangePasswordDialog.vue"

const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

const username = computed(() => {
  if (authStore.user) return authStore.user.fullName
  return ""
})

function changePasswordDialog() {
  $q.dialog({
    component: ChangePasswordDialog
  })
}

function getFirstChar(str) {
  return str.charAt(0)
}
</script>

<style>
.logo {
  width: 48px;
}

.business-layout {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='2'%3E%3Cpath transform='translate(0 0)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='4' transform='rotate(0 800 450)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(0 0)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='4'%3E%3Cpath transform='translate(0 0)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='8' transform='rotate(0 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='rotate(0 1400 132)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

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
}</style>
