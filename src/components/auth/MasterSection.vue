<template>
  <q-card-section
    :class="$q.screen.lt.sm ? 'no-padding' : ''"
    class="col-md-7 col-sm-12 col-xs-12"
  >
    <div :class="$q.screen.gt.xs ? 'q-pa-lg' : ''">
      <div class="q-mb-sm">
        <div class="row items-center justify-between q-mb-lg">
          <div class="text-h5 no-letter-spacing text-weight-700">
            ورود
          </div>
          <q-btn
            rounded
            target="_blank"
            href="https://landa-sme.ir/account/register"
            text-color="white"
            unelevated
            padding="8px 16px"
            class="primary-gradient text-body1 no-letter-spacing signup"
          >
            ثبت‌نام
          </q-btn>
        </div>
        <div
          class="text-body1 line-height-sm no-letter-spacing q-mb-lg"
        >
          نام‌کاربری و رمز عبور خود را وارد کنید، اگر رمز یا نام
          کاربری خود را فراموش کرده اید بر روی پیوندی به همین نام کلیک
          کنید.
        </div>
      </div>
      <q-form class="login-form" @submit="authenticate">
        <div class="column q-gutter-md text-on-dark">
          <div class="q-gutter-y-sm">
            <div
              class="text-body1 no-letter-spacing"
              :class="$q.dark.isActive ? 'text-white' : 'text-grey-8'"
            >
              {{ $t("login-page.placeholders.username") }}
            </div>
            <q-input
              class="login"
              hide-bottom-space
              v-model="userName"
              dense
              lazy-rules
              outlined
              input-class="text-body1 no-letter-spacing"
              :rules="[(val) => val !== null && val !== '']"
            >
              <template v-slot:prepend>
                <q-icon
                  name="o_person"
                  :color="
                    userName.trim() !== '' ? 'green' : 'negative'
                  "
                />
              </template>
            </q-input>
          </div>
          <div class="col">
            <div class="q-gutter-y-sm">
              <div
                class="text-body1 no-letter-spacing"
                :class="
                  $q.dark.isActive ? 'text-white' : 'text-grey-8'
                "
              >
                {{ $t("login-page.placeholders.password") }}
              </div>
              <q-input
                class="login"
                v-model="password"
                hide-bottom-space
                outlined
                input-class="text-body1 no-letter-spacing"
                :type="isPwd ? 'password' : 'text'"
                dense
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

                <template v-slot:prepend>
                  <q-icon
                    name="o_lock"
                    :color="
                      password.trim() !== '' ? 'green' : 'negative'
                    "
                  />
                </template>
              </q-input>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="row q-mt-lg items-center">
            <div
              class="q-mb-sm text-body1 no-letter-spacing"
              :class="$q.dark.isActive ? 'text-white' : 'text-grey-8'"
            >
              کد صحت سنجی
            </div>
          </div>

          <div class="row items-center q-col-gutter-md">
            <div class="col-md-4 col-sm-4 col-xs-6">
              <q-input
                v-model="captcha"
                inputmode="numeric"
                type="number"
                outlined
                hide-bottom-space
                dense
                input-class="text-body1 text-bold"
                class="login"
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
              >
                <template #append>
                  <q-btn
                    round
                    flat
                    color="primary"
                    icon="refresh"
                    dense
                    size="11px"
                    @click="getCaptcha"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-md col-sm-6 col-xs row items-center">
              <img
                v-if="authStore.captchaToken?.imageBase64"
                :src="captchaSource"
                alt="Captcha Image"
                class="captcha rounded-borders bordered"
              />
            </div>
          </div>
        </div>

        <div class="row items-center q-mt-xl">
          <div class="col-md-5 col-sm-5 col-xs-12">
            <q-btn
              rounded
              unelevated
              type="submit"
              text-color="white"
              class="primary-gradient full-width text-body1"
              padding="16px 64px"
              :label="$t('login-page.buttons.login')"
              :disable="isLoggingIn"
            >
              <!-- <div class="q-pl-sm" v-if="!isLoggingIn">
                <q-spinner-pie class="white" size="13px" />
              </div> -->
            </q-btn>
          </div>
          <div class="col-md col-sm col-xs-12">
            <div
              class="row forgot-password"
              :class="
                $q.screen.lt.sm
                  ? 'justify-center q-mt-xl'
                  : 'justify-end'
              "
            >
              <a
                href="https://landa-sme.ir/account/forgetpassword"
                class="no-decoration decoration-on-hover text-primary text-body1 no-letter-spacing text-bold no-letter-spacing"
              >
                {{ $t("login-page.forgot-password") }}
              </a>
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </q-card-section>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useAuthStore } from "../../stores";

  const authStore = useAuthStore();

  const userName = ref("");
  const password = ref("");
  const captcha = ref("");
  const isPwd = ref(true);

  async function authenticate() {
    await authStore.login(
      userName.value,
      password.value,
      captcha.value
    );
  }

  const isLoggingIn = computed(() => authStore.isLoggingIn);
  const captchaSource = computed(
    () =>
      `data:image/jpeg;base64, ${authStore.captchaToken?.imageBase64}`
  );

  async function getCaptcha() {
    await authStore.getCaptcha();
  }

  onMounted(() => {
    getCaptcha();
  });
</script>
