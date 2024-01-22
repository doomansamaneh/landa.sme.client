<template>
  <q-page class="full-screen flex justify-center items-center">
    <q-card class="card-layout q-mb-xl border-radius-lg q-py-md q-px-lg">
      <q-card-section class="row justify-center items-center">
        <img
          src="/about-us-header.png"
          class="logo full-width q-my-md"
        />

        <q-form
          class="login-form"
          @submit="authenticate"
        >
          <div class="column q-gutter-md">
            <div class="q-gutter-y-sm">
              <q-item-label caption>{{ $t('login-page.placeholders.username') }}</q-item-label>
              <q-input
                hide-bottom-space
                v-model="username"
                dense
                required
                lazy-rules
                outlined
                :rules="[(val) => val !== null && val !== '']"
              />
            </div>
            <div class="col">
              <div class="q-gutter-y-sm">
                <q-item-label caption>{{ $t('login-page.placeholders.password') }}</q-item-label>
                <q-input
                  v-model="password"
                  hide-bottom-space
                  outlined
                  :type="isPwd ? 'password' : 'text'"
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
            </div>
          </div>
          <div class="row justify-between q-gutter-x-md items-center q-my-md">
            <div class="col-5">
              <q-item-label
                caption
                class="q-pb-sm"
              >
                کد صحت سنجی
              </q-item-label>
              <q-input
                v-model="captcha"
                outlined
                hide-bottom-space
                dense
                class="text-body"
              />
            </div>
            <div class="col q-gutter-x-sm q-mt-lg">
              <img
                v-if="authStore.captchaToken?.imageBase64"
                :src="captchaSource"
                alt="Captcha Image"
              />
              <q-btn
                round
                flat
                color="primary"
                icon="refresh"
                dense
                @click="getCaptcha"
              />
            </div>
          </div>
          <div class="col">
            <q-btn
              unelevated
              type="submit"
              color="primary"
              size="md"
              class="login-btn full-width text-weight-bold q-py-sm q-mt-md"
              no-caps
              :label="$t('login-page.buttons.login')"
              :disable="isLoggingIn"
            >
              <div
                class="q-pl-sm"
                v-if="isLoggingIn"
              >
                <q-spinner-pie
                  class="white"
                  size="xs"
                />
              </div>
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
      <q-card-section class="text-center">
        <p class="forgot-password">
          <a
            href="https://landa-sme.ir/account/forgetpassword"
            class="text-white"
          >{{ $t("login-page.forgot-password") }}</a>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useAuthStore } from "../../stores"

const authStore = useAuthStore()

const username = ref("")
const password = ref("")
const captcha = ref("")
const isPwd = ref(true)

async function authenticate() {
  await authStore.login(username.value, password.value, captcha.value)
}

const isLoggingIn = computed(() => authStore.isLoggingIn)
const captchaSource = computed(() => `data:image/jpeg;base64, ${authStore.captchaToken?.imageBase64}`)

onMounted(() => {
  getCaptcha()
})

async function getCaptcha() {
  await authStore.getCaptcha()
}

</script>

<style lang="scss" scoped>
.card-layout {
  width: 400px;
}

.forgot-password a {
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration-line: underline;
}

.q-item__label--caption {
  font-size: 16px;
  letter-spacing: 0;
  color: #ffffff;
}

.logo {
  filter: brightness(0) invert(1);
}
</style>
