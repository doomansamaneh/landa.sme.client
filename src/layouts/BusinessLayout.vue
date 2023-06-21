<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white text-black q-qx-md">
      <q-toolbar class="q-px-lg">
        <q-toolbar-title class="text-black"><a href="#" class="navbar-logo">Landa-SME</a></q-toolbar-title>

        <alert-banner />

        <div class="flex items-center q-gutter-sm cursor-pointer">
          <div class="text-body">{{ username }}</div>
          <q-icon color="dark" size="sm" name="o_account_circle" />
          <q-menu fit class="" transition-show="jump-down" transition-hide="jump-up" :offset="[10, 28]">
            <q-list dense padding style="min-width: 240px" class="q-py-md">
              <q-item-label class="text-h6" header>
                <div class="column items-center justify-center q-mt-md">
                  <q-avatar color="blue-4" class="q-mx-sm" text-color="white" style="width: 72px; height: 72px">
                    <div class="text-weight-bold">
                      {{ getFirstChar(username) }}
                    </div>
                  </q-avatar>
                  <div class="q-mt-md">
                    {{ username }}
                  </div>
                </div>
              </q-item-label>
              <q-item clickable v-ripple v-close-popup class="q-mt-md" @click="goToChangePasswordPage">
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar color="grey-4" text-color="dark" icon="o_password" size="md" />
                  </q-item-section>
                </div>

                <q-item-section>{{
                  $t("business-layout.buttons.change-password")
                }}</q-item-section>
              </q-item>
              <q-item clickable v-close-popup tabindex="0" @click="authStore.logout()" class="q-py-sm">
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar color="grey-4" text-color="dark" icon="logout" size="md" />
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

  </q-layout>
</template>

<script setup>
  import { ref, computed } from "vue"
  import { useRouter } from "vue-router"
  import { useAuthStore } from "../stores"
  import AlertBanner from "src/components/shared/AlertBanner.vue"

  const router = useRouter()
  const authStore = useAuthStore()

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