<template>
  <q-layout class="auth-layout">
    <q-header class="login-header flex items-center justify-between q-py-lg">
      <q-toolbar class="">
        <q-toolbar-title class="row justify-start items-center q-ml-lg text-bold text-dark"><span
            class="text-white text-bold text-h5"
          >{{
            $t("login-page.page-title")
          }}</span>
        </q-toolbar-title>
        <div class="flex q-pr-md q-gutter-x-sm">
          <q-btn
            unelevated
            no-caps
            color="primary"
            :label="$t('login-page.buttons.signup')"
            class="signup-btn text-weight-bold"
            @click="gotoRegisterPage"
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
              <div class="column justify-center items-center q-gutter-y-md q-mt-xl">
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

import { useQuasar } from "quasar"
import { ref, onMounted, watchEffect } from "vue"

const authStore = useAuthStore()
authStore.clearUser()

const drawer = ref(false)

const $q = useQuasar()

const darkMode = ref(false)
const selectedTheme = ref("")

watchEffect(darkMode, (newVal) => {
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

const gotoRegisterPage = () => {
  window.location.href = "https://landa-sme.ir/account/register"
}
</script>

<style>
.auth-layout {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Ccircle stroke='%23FFFFFF' vector-effect='non-scaling-stroke' id='a' fill='none' stroke-width='6.9' r='315'/%3E%3Cuse id='f' href='%23a' stroke-dasharray='100 100 100 9999'/%3E%3Cuse id='b' href='%23a' stroke-dasharray='250 250 250 250 250 9999'/%3E%3Cuse id='e' href='%23a' stroke-dasharray='1000 500 1000 500 9999'/%3E%3Cuse id='g' href='%23a' stroke-dasharray='1500 9999'/%3E%3Cuse id='h' href='%23a' stroke-dasharray='2000 500 500 9999'/%3E%3Cuse id='j' href='%23a' stroke-dasharray='800 800 800 800 800 9999'/%3E%3Cuse id='k' href='%23a' stroke-dasharray='1200 1200 1200 1200 1200 9999'/%3E%3Cuse id='l' href='%23a' stroke-dasharray='1600 1600 1600 1600 1600 9999'/%3E%3C/defs%3E%3Cg transform='translate(1000 750)' stroke-opacity='0.1'%3E%3Cg %3E%3Ccircle fill='%23FFFFFF' fill-opacity='0.1' r='10'/%3E%3Cg transform=''%3E%3Cuse href='%23f' transform='scale(.1) rotate(50 0 0)' /%3E%3Cuse href='%23f' transform='scale(.2) rotate(100 0 0)' /%3E%3Cuse href='%23f' transform='scale(.3) rotate(150 0 0)' /%3E%3C/g%3E%3Cg transform=''%3E%3Cuse href='%23b' transform='scale(.4) rotate(200 0 0)' /%3E%3Cuse href='%23z' transform='scale(.5) rotate(250 0 0)' /%3E%3C/g%3E%3Cg id='z' transform=''%3E%3Cg transform=''%3E%3Cuse href='%23b'/%3E%3Cuse href='%23b' transform='scale(1.2) rotate(90 0 0)' /%3E%3Cuse href='%23b' transform='scale(1.4) rotate(60 0 0)' /%3E%3Cuse href='%23e' transform='scale(1.6) rotate(120 0 0)' /%3E%3Cuse href='%23e' transform='scale(1.8) rotate(30 0 0)' /%3E%3C/g%3E%3C/g%3E%3Cg id='y' transform=''%3E%3Cg transform=''%3E%3Cuse href='%23e' transform='scale(1.1) rotate(20 0 0)' /%3E%3Cuse href='%23g' transform='scale(1.3) rotate(-40 0 0)' /%3E%3Cuse href='%23g' transform='scale(1.5) rotate(60 0 0)' /%3E%3Cuse href='%23h' transform='scale(1.7) rotate(-80 0 0)' /%3E%3Cuse href='%23j' transform='scale(1.9) rotate(100 0 0)' /%3E%3C/g%3E%3C/g%3E%3Cg transform=''%3E%3Cg transform=''%3E%3Cg transform=''%3E%3Cuse href='%23h' transform='scale(2) rotate(60 0 0)'/%3E%3Cuse href='%23j' transform='scale(2.1) rotate(120 0 0)'/%3E%3Cuse href='%23j' transform='scale(2.3) rotate(180 0 0)'/%3E%3Cuse href='%23h' transform='scale(2.4) rotate(240 0 0)'/%3E%3Cuse href='%23j' transform='scale(2.5) rotate(300 0 0)'/%3E%3C/g%3E%3Cuse href='%23y' transform='scale(2) rotate(180 0 0)' /%3E%3Cuse href='%23j' transform='scale(2.7)'/%3E%3Cuse href='%23j' transform='scale(2.8) rotate(45 0 0)'/%3E%3Cuse href='%23j' transform='scale(2.9) rotate(90 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.1) rotate(135 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.2) rotate(180 0 0)'/%3E%3C/g%3E%3Cuse href='%23k' transform='scale(3.3) rotate(225 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.5) rotate(270 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.6) rotate(315 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.7)'/%3E%3Cuse href='%23k' transform='scale(3.9) rotate(75 0 0)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
