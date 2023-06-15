<template>
  <q-page class="full-screen">
    <q-layout class="flex justify-center items-center">
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
              <q-btn-dropdown
                no-caps
                icon="language"
                :label="selectedLanguageLabel"
                :options="languageOptions"
                class="bg-white text-primary"
                auto-close
              >
                <q-item-section>
                  <q-item
                    clickable
                    v-for="(lang, index) in supportedLanguages"
                    :key="index"
                  >
                    <q-item-section @click="switchLanguage(lang.code)">
                      <q-item-label>{{ lang.name }}</q-item-label>
                    </q-item-section>
                    <q-item-section v-if="currentLanguage === lang.code">
                      <q-icon
                        name="done"
                        color="primary"
                        size="xs"
                        right
                      ></q-icon>
                    </q-item-section>
                  </q-item>
                </q-item-section>
              </q-btn-dropdown>
            </div>
          </q-toolbar>
        </q-header>
      </div>
      <div class="body-section q-mt-xl">
        <div class="login-form-container column justify-center items-center">
          <div class="logo flex justify-center">
            <q-img
              src="/src/assets/about-us-header.png"
              class="q-mb-md"
              style="width: 270px"
            />
          </div>
          <q-card
            class="login-form no-shadow"
            style="background-color: #f5f6f9"
          >
            <q-card-section>
              <q-form class="" @submit="authenticate">
                <div class="username-input">
                  <q-input
                    outlined
                    v-model="username"
                    :placeholder="$t('login-page.placeholders.username')"
                    dense
                    class="noen-border text-body"
                    required
                    lazy-rules
                    :rules="[(val) => val !== null && val !== '']"
                  />
                </div>
                <div class="password-input">
                  <q-input
                    outlined
                    v-model="password"
                    :type="isPwd ? 'password' : 'text'"
                    :placeholder="$t('login-page.placeholders.password')"
                    dense
                    required
                    lazy-rules
                    :rules="[(val) => val !== null && val !== '']"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        size="xs"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="row justify-between items-center">
                  <div class="flex">
                    <q-btn
                      unelevated
                      color="grey-6"
                      label="65 + 8"
                      dense
                      class="q-px-md text-h6"
                    />
                  </div>
                  <div class="q-pr-md">
                    <q-btn round flat color="blue-6" icon="refresh" dense />
                  </div>

                  <div class="col-5">
                    <q-input
                      outlined
                      v-model="ph"
                      placeholder="1234"
                      dense
                      class="text-body bg-white"
                      color="blue-5"
                    />
                  </div>

                  <div class="full-width q-mt-lg">
                    <q-btn
                      unelevated
                      type="submit"
                      color="light-blue-6"
                      size="md"
                      class="login-btn full-width text-weight-bold q-py-sm"
                      no-caps
                      :label="$t('login-page.buttons.login')"
                      :disable="isLoggingIn"
                    >
                      <div class="q-pl-sm" v-if="isLoggingIn">
                        <q-spinner-pie class="white" size="xs" />
                      </div>
                    </q-btn>
                  </div>
                </div>
              </q-form>
            </q-card-section>

            <q-card-section class="text-center q-pa-none">
              <p class="forgot-password text-blue-7 q-mt-lg">
                <a href="#">{{ $t("login-page.forgot-password") }}</a>
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="error-code0-banner" v-if="authStore.showErrorCode0Banner">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated bounceInDown"
          :duration="1000"
        >
          <q-banner inline-actions class="q-banner-error bg-red-1 text-red">
            <q-icon name="error" size="22px" class="q-mr-xs" />
            <span>{{ $t("login-page.invalid-username-password") }}</span>
            <template v-slot:action>
              <q-icon
                @click="closeErrorCode0Banner"
                flat
                unelevated
                color="red"
                name="close"
                class="cursor-pointer"
              />
            </template>
          </q-banner>
        </transition>
      </div>
    </q-layout>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watchEffect, computed, watch } from "vue"
import { useAuthStore } from "../../stores"
import { useI18n } from "vue-i18n"
const { locale } = useI18n()

const authStore = useAuthStore()
const username = ref("")
const password = ref("")
const isPwd = ref(true)

async function authenticate() {
  await authStore.login(username.value, password.value)
}

// Language switcher
const supportedLanguages = [
  {
    code: "en-US",
    name: "English",
    dir: "ltr"
  },
  {
    code: "fa-IR",
    name: "فارسی",
    dir: "rtl"
  },
  {
    code: "ar",
    name: "عربي",
    dir: "rtl"
  }
]

// Retrieve selected language and direction from local storage
const userSelectedLanguage = localStorage.getItem("selectedLanguage")
const userLanguageDirection = localStorage.getItem("languageDirection")

// Set the default language and direction
const currentLanguage = ref(userSelectedLanguage || "fa-IR") // changed from "en-US" to "fa-IR"
const languageDirection = ref(userLanguageDirection || "ltr")

const selectedLanguageLabel = computed(() => {
  switch (currentLanguage.value) {
    case "en-US":
      return "English"
    case "fa-IR":
      return "فارسی"
    case "ar":
      return "عربی"
    default:
      return ""
  }
})

const switchLanguage = (code) => {
  currentLanguage.value = code
  locale.value = code

  // Determine direction of language
  let dir = "ltr"
  if (code !== "en-US") {
    dir = "rtl"
  }

  // Save language and direction to local storage
  localStorage.setItem("selectedLanguage", code)
  localStorage.setItem("languageDirection", dir)

  // Update direction for current page
  languageDirection.value = dir
}

onMounted(() => {
  // Retrieve selected language and direction from local storage
  const userSelectedLanguage = localStorage.getItem("selectedLanguage")
  const userLanguageDirection = localStorage.getItem("languageDirection")

  if (userSelectedLanguage) {
    currentLanguage.value = userSelectedLanguage
    locale.value = userSelectedLanguage
  }

  if (userLanguageDirection) {
    document.documentElement.setAttribute("dir", userLanguageDirection)
    languageDirection.value = userLanguageDirection
  }
})

// Define computed variable for isLoggingIn state
const isLoggingIn = computed(() => authStore.isLoggingIn)

// Reload page when currentLanguage changes
watch(currentLanguage, () => {
  location.reload()
})
</script>

<style lang="scss">
.header {
  background-color: #f5f6f9;
}

.q-page {
  background-color: #f5f6f9;
}

.login-form-container {
  width: 300px;
}

.forgot-password a {
  text-decoration: none;
  color: #0087f6;
}

.q-field--outlined .q-field__control:before {
  background-color: white;
}

.q-field--outlined:hover .q-field__control:before {
  border-color: primary;
}

.q-field--highlighte {
  box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 5px rgb(147, 214, 255),
    0 0 5px rgb(147, 214, 255), 0 0 2px rgb(147, 214, 255),
    0 0 3px rgb(147, 214, 255);
  transition: box-shadow 0.3s ease-in-out;
}

.error-code0-banner {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.q-banner {
  margin-top: 25px;
  border-top: 1px solid rgb(233, 60, 60);
}

.login-form {
  margin-bottom: 16px;
  margin-top: 42px;
}

@media (max-width: $breakpoint-sm-max) {
  .q-toolbar {
    padding: 0;
  }

  .q-banner {
    margin-top: 0;
  }
}

.q-banner-error {
  height: 70px;
}

.q-btn-dropdown--simple * + .q-btn-dropdown__arrow {
  margin-left: 8px;
  color: $primary;
}

.q-btn--actionable.q-btn--standard:before {
  border: 1px solid $primary;
  box-shadow: none;
}
</style>
