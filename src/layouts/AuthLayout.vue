<template>
  <q-layout>
    <q-header class="login-header flex items-center justify-between q-py-lg">
      <q-toolbar class="">
        <q-toolbar-title
          class="row justify-start items-center q-ml-lg text-bold text-dark"
          ><span class="text-on-dark text-bold text-h5">{{
            $t("login-page.page-title")
          }}</span>
          <div class="q-ml-md">
            <switch-theme class="gt-xs" />
          </div>
        </q-toolbar-title>
        <div class="flex q-pr-md q-gutter-x-sm">
          <q-btn
            unelevated
            no-caps
            color="primary"
            :label="$t('login-page.buttons.signup')"
            class="signup-btn text-weight-bold"
          />
          <switch-language class="lang-switcher gt-xs" />
        </div>
        <div class="q-pr-md xs">
          <q-btn
            icon="menu"
            round
            dense
            @click="drawer = !drawer"
            flat
            unelevated
          />
          <q-drawer
            v-model="drawer"
            :width="300"
            :breakpoint="500"
            overlay
            :class="$q.dark.isActive ? 'bg-dark' : 'bg-dark'"
          >
            <q-list class="flex justify-center q-mt-xl">
              <div
                class="column justify-center items-center q-gutter-y-md q-mt-xl"
              >
                <q-icon
                  name="circle"
                  size="xl"
                  color="blue-5"
                  class="cursor-pointer"
                  icon="format_paint"
                  @click="selectTheme('blue')"
                />
                <q-icon
                  name="circle"
                  size="xl"
                  color="green"
                  class="cursor-pointer"
                  @click="selectTheme('green')"
                />
                <q-icon
                  name="circle"
                  size="xl"
                  color="orange"
                  class="cursor-pointer"
                  @click="selectTheme('orange')"
                />

                <div class="q-mt-xl">
                  <q-toggle
                    color="blue-8"
                    v-model="darkMode"
                    unchecked-icon="light_mode"
                    checked-icon="dark_mode"
                    size="5rem"
                  />
                </div>
                <div class="flex justify-center q-mb-xl absolute-bottom">
                  <switch-language class="lang-switcher" />
                </div>
              </div>
            </q-list>
          </q-drawer>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <alert-banner />
</template>

<script setup>
import { useAuthStore } from "../stores"
import AlertBanner from "src/components/shared/AlertBanner.vue"
import SwitchLanguage from "../components/shared/SwitchLanguage.vue"
import SwitchTheme from "../components/shared/SwitchTheme.vue"

import { useQuasar } from "quasar"
import { ref, onMounted, watch } from "vue"

const authStore = useAuthStore()
authStore.clearUser()

const drawer = ref(false)

const $q = useQuasar()

const darkMode = ref(false)
const selectedTheme = ref("")

watch(darkMode, (newVal) => {
  $q.dark.set(newVal ? "auto" : false)
  localStorage.setItem("darkMode", newVal)
})

onMounted(() => {
  const darkModeisActive = localStorage.getItem("darkMode")
  if (darkModeisActive === "true") {
    darkMode.value = true
  }

  const storedTheme = localStorage.getItem("selectedTheme")
  if (storedTheme) {
    selectTheme(storedTheme)
  }
})

const selectTheme = (theme) => {
  if (selectedTheme.value) {
    document.body.classList.remove(`theme--${selectedTheme.value}`)
  }
  document.body.classList.add(`theme--${theme}`)
  selectedTheme.value = theme
  localStorage.setItem("selectedTheme", theme)
}
</script>
