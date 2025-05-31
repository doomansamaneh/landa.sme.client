<template>
  <q-card-section
    :class="$q.screen.lt.sm ? 'no-padding' : ''"
    class="col-md-7 col-sm-12 col-xs-12"
  >
    <div :class="$q.screen.gt.xs ? 'q-pa-lg' : ''">
      <div class="">
        <div class="row items-center justify-between q-mb-lg">
          <div class="flex items-center">
            <div class="text-h5 text-weight-700">ورود</div>
            <a
              href="https://my.landa-sme.ir/"
              target="_blank"
              class="no-decoration decoration-on-hover q-ml-sm text-body2 text-weight-700 text-white bg-red rounded-borders q-py-xs q-px-sm"
            >
              ورود با نسخه قدیمی
            </a>
          </div>
          <q-btn
            rounded
            target="_blank"
            href="https://landa-sme.ir/account/register"
            text-color="white"
            unelevated
            padding="8px 16px"
            class="primary-gradient text-body1 signup"
          >
            ثبت‌نام
          </q-btn>
        </div>
      </div>
      <q-form class="login-form" @submit="authenticate">
        <div class="column q-gutter-md text-on-dark">
          <div class="q-gutter-y-sm">
            <div
              class="text-body1"
              :class="$q.dark.isActive ? 'text-white' : 'text-grey-8'"
            >
              {{ $t("login-page.placeholders.username") }}
            </div>
            <custom-input
              class="login"
              hide-bottom-space
              v-model="userName"
              dense
              rounded
              lazy-rules
              outlined
              input-class="text-body1 "
              required
            >
              <template #prepend>
                <q-icon
                  name="o_person"
                  :color="
                    userName.trim() !== '' ? 'green' : 'negative'
                  "
                />
              </template>
            </custom-input>
          </div>
          <div class="col">
            <div class="q-gutter-y-sm">
              <div
                class="text-body1"
                :class="
                  $q.dark.isActive ? 'text-white' : 'text-grey-8'
                "
              >
                {{ $t("login-page.placeholders.password") }}
              </div>
              <custom-input
                class="login"
                v-model="password"
                hide-bottom-space
                outlined
                rounded
                input-class="text-body1 "
                :type="isPwd ? 'password' : 'text'"
                dense
                lazy-rules
                required
              >
                <template #append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    size="xs"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>

                <template #prepend>
                  <q-icon
                    name="o_lock"
                    :color="
                      password.trim() !== '' ? 'green' : 'negative'
                    "
                  />
                </template>
              </custom-input>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="row q-mt-lg items-center">
            <div
              class="q-mb-sm text-body1"
              :class="$q.dark.isActive ? 'text-white' : 'text-grey-8'"
            >
              کد امنیتی
            </div>
          </div>

          <div class="row items-center q-col-gutter-md">
            <div class="col-md-4 col-sm-4 col-xs-6">
              <custom-input
                v-model="captcha"
                rounded
                inputmode="numeric"
                outlined
                hide-bottom-space
                dense
                input-class="text-body1 text-bold"
                class="login"
                lazy-rules
                required
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
              </custom-input>
            </div>
            <div class="col-md col-sm-6 col-xs row items-center">
              <img
                v-if="authStore.captchaToken?.imageBase64"
                :src="captchaSource"
                alt="Captcha Image"
                class="captcha bordered"
                style="border-radius: 42px"
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
            />
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
                class="no-decoration decoration-on-hover text-primary text-body1 text-bold"
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

  import CustomInput from "components/shared/forms/CustomInput.vue";

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
