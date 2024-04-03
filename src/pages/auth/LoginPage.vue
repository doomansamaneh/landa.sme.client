<template>
  <q-page :class="$q.screen.gt.xs
      ? 'flex full-screen items-center justify-center'
      : 'q-pt-lg'
    ">
    <div class="main-container">
      <login-background v-if="$q.screen.gt.xs" />

      <q-card class="no-padding" :class="[
    $q.screen.gt.xs ? 'bordered border-radius-lg' : 'no-shadow no-border',
    $q.screen.gt.sm ? 'login-card' : '',
  ]">
        <q-card-section horizontal>
          <q-card-section :class="$q.screen.lt.sm ? 'no-padding' : ''" class="col-md-7 col-sm-12 col-xs-12">
            <div :class="$q.screen.gt.xs ? 'q-pa-lg' : ''">
              <div class="q-mb-sm">
                <div class="row items-center justify-between q-mb-lg">
                  <div class="text-h5 no-letter-spacing text-weight-700">
                    ورود
                  </div>
                  <q-btn href="https://landa-sme.ir/account/register" color="primary" unelevated padding="8px 16px"
                    class="border-radius-lg text-body1 no-letter-spacing signup">
                    ثبت‌نام
                  </q-btn>
                </div>
                <div class="q-item__label--caption text-body1 line-height-sm no-letter-spacing q-mb-lg">
                  نام‌کاربری و رمز عبور خود را وارد کنید، اگر رمز یا نام کاربری
                  خود را فراموش کرده اید بر روی پیوندی به همین نام کلیک کنید.
                </div>
              </div>
              <q-form class="login-form" @submit="authenticate">
                <div class="column q-gutter-md text-on-dark">
                  <div class="q-gutter-y-sm">
                    <q-item-label caption>{{
    $t("login-page.placeholders.username")
  }}</q-item-label>
                    <q-input class="login" hide-bottom-space v-model="username" dense required lazy-rules outlined
                      :rules="[(val) => val !== null && val !== '']">
                      <template v-slot:prepend>
                        <q-icon name="o_mail" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col">
                    <div class="q-gutter-y-sm">
                      <q-item-label caption>{{
    $t("login-page.placeholders.password")
  }}</q-item-label>
                      <q-input class="login" v-model="password" hide-bottom-space outlined
                        :type="isPwd ? 'password' : 'text'" dense required lazy-rules
                        :rules="[(val) => val !== null && val !== '']">
                        <template v-slot:append>
                          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" size="xs" class="cursor-pointer"
                            @click="isPwd = !isPwd" />
                        </template>

                        <template v-slot:prepend>
                          <q-icon name="o_lock" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div class="row q-mt-lg items-center">
                    <q-item-label caption class="q-pb-sm">
                      کد صحت سنجی
                    </q-item-label>
                  </div>

                  <div class="row items-center q-col-gutter-md">
                    <div class="col-md-4 col-sm-4 col-xs-6">
                      <q-input v-model="captcha" inputmode="numeric" type="number" outlined hide-bottom-space dense
                        input-class="text-body1 text-bold" class="login">
                        <template #append>
                          <q-btn round flat color="primary" icon="refresh" dense size="11px" @click="getCaptcha" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-md col-sm-6 col-xs row items-center">
                      <img v-if="authStore.captchaToken?.imageBase64" :src="captchaSource" alt="Captcha Image"
                        style="height:45px; width:120px object-fit: cover;" width="150"
                        class="rounded-borders bordered" />
                    </div>
                  </div>
                </div>

                <div class="row items-center q-mt-xl">
                  <div class="col-md-5 col-sm-5 col-xs-12">
                    <q-btn unelevated type="submit" color="primary" class="full-width text-body1 border-radius-lg"
                      padding="16px 64px" :label="$t('login-page.buttons.login')" :disable="isLoggingIn">
                      <div class="q-pl-sm" v-if="isLoggingIn">
                        <q-spinner-pie class="white" size="13px" />
                      </div>
                    </q-btn>
                  </div>
                  <div class="col-md col-sm col-xs-12">
                    <div class="row forgot-password" :class="$q.screen.lt.sm
      ? 'justify-center q-mt-xl'
      : 'justify-end'
    ">
                      <a href="https://landa-sme.ir/account/forgetpassword"
                        class="text-primary text-weight-bold no-letter-spacing">
                        {{ $t("login-page.forgot-password") }}
                      </a>
                    </div>
                  </div>
                </div>
              </q-form>
            </div>
          </q-card-section>

          <q-card-section v-if="$q.screen.gt.sm" class="login-card-pic col-md col-sm-12 col-xs-12 q-pa-xl">
            <boy-animation style="filter: drop-shadow(0 0 15px #00000012)" />
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "../../stores";
import BoyAnimation from "src/assets/BoyAnimation.vue";
import LoginBackground from "src/assets/LoginBackground.vue";

const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const captcha = ref("");
const isPwd = ref(true);

async function authenticate() {
  await authStore.login(username.value, password.value, captcha.value);
}

const isLoggingIn = computed(() => authStore.isLoggingIn);
const captchaSource = computed(
  () => `data:image/jpeg;base64, ${authStore.captchaToken?.imageBase64}`
);

onMounted(() => {
  getCaptcha();
});

async function getCaptcha() {
  await authStore.getCaptcha();
}
</script>

<style lang="scss">
.forgot-password a {
  text-decoration: none;
}

.login {
  .q-field__control {
    height: 45px;
    display: flex;
    align-items: center;
    outline: none;
  }
}

.login-card {
  width: 970px;
}

.forgot-password a:hover {
  text-decoration-line: underline;
}

.q-item__label--caption {
  font-size: 16px;
  letter-spacing: 0;
  color: #9a9a9a;
}

.logo {
  filter: brightness(0) invert(1);
}

.signup {
  animation: wiggle 2s linear infinite;
}

.signup:hover {
  animation: none;
}

@keyframes wiggle {

  0%,
  7% {
    transform: rotateZ(0);
  }

  15% {
    transform: rotateZ(-15deg);
  }

  20% {
    transform: rotateZ(10deg);
  }

  25% {
    transform: rotateZ(-10deg);
  }

  30% {
    transform: rotateZ(6deg);
  }

  35% {
    transform: rotateZ(-4deg);
  }

  40%,
  100% {
    transform: rotateZ(0);
  }
}
</style>
