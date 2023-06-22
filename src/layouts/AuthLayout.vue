<template>
  <q-layout>
    <div class="header-section">
      <q-header class="header flex items-center text-dark q-py-lg">
        <q-toolbar>
          <q-toolbar-title
            class="flex justify-start q-ml-lg text-weight-bold text-dark"
            ><span class="text-weight-bold text-h5">{{
              $t("login-page.page-title")
            }}</span></q-toolbar-title
          >
          <div class="flex q-pr-lg q-gutter-sm">
            <q-btn
              unelevated
              no-caps
              color="blue-6"
              :label="$t('login-page.buttons.signup')"
              class="signup-btn text-weight-bold"
            />
            <language-switcher />
          </div>
        </q-toolbar>
      </q-header>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <alert-banner />
</template>

<script setup>
import { useAuthStore } from "../stores"
import AlertBanner from "src/components/shared/AlertBanner.vue"
import LanguageSwitcher from "src/components/LanguageSwitcher.vue"

const authStore = useAuthStore()
authStore.clearUser()
</script>

<style></style>
