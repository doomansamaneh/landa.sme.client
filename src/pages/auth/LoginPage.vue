<template>
  <q-page class="login-page full-screen flex justify-center items-center">
    <div class="body-section q-mb-xl">
      <div class="login-form-container">
        <div class="logo flex justify-center">
          <q-img
            src="../../assets/about-us-header.png"
            class="q-mb-md"
            style="width: 270px"
          />
        </div>
        <q-card class="login-form no-shadow">
          <q-card-section>
            <q-form class="login-form" @submit="authenticate">
              <div class="username-input">
                <q-input
                  v-model="username"
                  :placeholder="$t('login-page.placeholders.username')"
                  dense
                  class="noen-border text-body"
                  required
                  lazy-rules
                  outlined
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
                    placeholder="1234"
                    dense
                    class="text-body"
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
  </q-page>
</template>

<script setup>
import {
  ref,
  onBeforeUnmount,
  onMounted,
  watchEffect,
  computed,
  watch
} from "vue"
import { useAuthStore } from "../../stores"
import { useI18n } from "vue-i18n"
const { locale } = useI18n({ useScope: "global" })
import { Quasar } from "quasar"
import { useQuasar } from "quasar"

const $q = useQuasar()
const authStore = useAuthStore()

const username = ref("")
const password = ref("")
const isPwd = ref(true)

async function authenticate() {
  await authStore.login(username.value, password.value)
}

const isLoggingIn = computed(() => authStore.isLoggingIn)
</script>

<style lang="scss" scoped>
.login-form-container {
  width: 300px;
}

.forgot-password a {
  text-decoration: none;
  color: #0087f6;
}
</style>
