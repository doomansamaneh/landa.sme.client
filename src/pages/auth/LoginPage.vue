<template>
  <q-page class="full-screen">
    <q-layout class="flex justify-center items-center">
      <div class="header-section">
        <q-header class="header flex items-center text-dark q-py-lg">
          <q-toolbar>
            <q-toolbar-title
              class="flex justify-start q-ml-lg text-weight-bold text-dark"
              ><span class="text-weight-bold text-h5"
                >Log in</span
              ></q-toolbar-title
            >
            <div class="flex q-pr-lg q-gutter-sm">
              <q-btn
                unelevated
                no-caps
                color="blue-6"
                label="Sign up"
                class="signup-btn text-weight-bold"
              />
              <q-btn-dropdown
                outline
                push
                no-caps
                color="grey-9"
                icon="language"
                label="en"
                @click="onMainClick"
                class="text-dark bg-white"
                style="height: 42px"
              >
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>fa</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>ar</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </q-toolbar>
        </q-header>
      </div>
      <div class="body-section full-width">
        <div class="login-form column justify-center items-center">
          <div class="logo flex justify-center">
            <q-img
              src="/src/assets/about-us-header.png"
              class="q-mb-md"
              style="width: 270px"
            />
          </div>
          <q-card class="form no-shadow" style="background-color: #f5f6f9">
            <q-card-section>
              <q-form class="" @submit="authenticate">
                <div class="username-input">
                  <q-input
                    outlined
                    v-model="username"
                    placeholder="Username (Mobile/Email)"
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
                    placeholder="Password"
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
                      label="Log in"
                    />
                  </div>
                </div>
              </q-form>
            </q-card-section>

            <q-card-section class="text-center q-pa-none">
              <p class="forgot-password text-blue-7 q-mt-lg">
                <a href="#">Forgot your password?</a>
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
              <span>{{ authStore.errorCode0Message }}</span>
              <template v-slot:action>
                <q-btn @click="closeErrorCode0Banner" flat unelevated color="red" label="Dismiss" />
              </template>
            </q-banner>
          </transition>
        </div>
    </q-layout>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useAuthStore } from "../../stores"
import { data } from "autoprefixer"

const authStore = useAuthStore()
const username = ref("")
const password = ref("")
const isPwd = ref(true)

async function authenticate() {
  const authStore = useAuthStore()
  await authStore.login(username.value, password.value)
}

const closeErrorCode0Banner = () => {
  authStore.errorCode0 = ''
  authStore.errorCode0Message = ''
}
</script>

<style lang="scss">
.header {
  background-color: #f5f6f9;
}

.q-page {
  background-color: #f5f6f9;
}

.q-card {
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

/* .q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
  box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 5px rgb(147, 214, 255),
    0 0 5px rgb(147, 214, 255), 0 0 2px rgb(147, 214, 255),
    0 0 3px rgb(147, 214, 255);
  transition: box-shadow 0.3s ease-in-out;
} */

.q-banner {
  margin-top: 25px;
  border-bottom: 2px solid rgb(233, 60, 60);
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
</style>
