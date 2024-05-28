<template>
  <div class="change-password-container">
    <q-card
      :class="$q.screen.gt.xs ? 'bordered' : 'no-border no-shadow'"
    >
      <q-card-section
        :class="{
          'q-pa-xl': $q.screen.gt.xs,
          'no-padding': $q.screen.lt.sm,
        }"
      >
        <q-form ref="form" autofocus>
          <div
            class="row q-col-gutter-lg"
            :class="$q.screen.gt.xs ? 'q-mb-lg' : 'q-mb-md'"
          >
            <div class="col-md-6 col-sm-7 col-xs-12">
              <div
                class="q-mb-sm text-body2 caption-on-dark no-letter-spacing"
              >
                {{
                  $t("change-password-page.placeholders.old-password")
                }}
              </div>
              <q-input
                hide-bottom-space
                outlined
                v-model="oldPassword"
                :type="isPwdOldPassword ? 'password' : 'text'"
                dense
                class="text-body1 no-letter-spacing"
                required
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="
                      isPwdOldPassword
                        ? 'visibility_off'
                        : 'visibility'
                    "
                    size="sm"
                    class="cursor-pointer q-ml-sm"
                    @click="isPwdOldPassword = !isPwdOldPassword"
                  />
                </template>
              </q-input>
            </div>
          </div>

          <div
            class="row q-col-gutter-lg"
            :class="$q.screen.gt.xs ? 'q-mb-lg' : 'q-mb-md'"
          >
            <div class="col-md-6 col-sm-7 col-xs-12">
              <div
                class="q-mb-sm text-body2 caption-on-dark no-letter-spacing"
              >
                {{
                  $t("change-password-page.placeholders.new-password")
                }}
              </div>
              <q-input
                hide-bottom-space
                outlined
                v-model="newPassword"
                :type="isPwdNewPassword ? 'password' : 'text'"
                dense
                class="text-body1 no-letter-spacing"
                required
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="
                      isPwdNewPassword
                        ? 'visibility_off'
                        : 'visibility'
                    "
                    size="sm"
                    class="cursor-pointer q-ml-sm"
                    @click="isPwdNewPassword = !isPwdNewPassword"
                  />
                </template>
              </q-input>
            </div>
          </div>

          <div
            class="row q-col-gutter-lg"
            :class="$q.screen.gt.xs ? 'q-mb-lg' : 'q-mb-md'"
          >
            <div class="col-md-6 col-sm-7 col-xs-12">
              <div
                class="q-mb-sm text-body2 caption-on-dark no-letter-spacing"
              >
                {{
                  $t(
                    "change-password-page.placeholders.confirm-password"
                  )
                }}
              </div>
              <q-input
                hide-bottom-space
                outlined
                v-model="confirmNewPassword"
                :type="isPwdConfirmPassword ? 'password' : 'text'"
                dense
                class="text-body1 no-letter-spacing"
                required
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="
                      isPwdConfirmPassword
                        ? 'visibility_off'
                        : 'visibility'
                    "
                    size="sm"
                    class="cursor-pointer q-ml-sm"
                    @click="
                      isPwdConfirmPassword = !isPwdConfirmPassword
                    "
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-form>
        <q-btn
          class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
          padding="6px 12px"
          rounded
          unelevated
          @click="save"
        >
          <q-icon name="o_save" size="20px" class="q-mr-sm" />
          {{ $t("shared.labels.save") }}
        </q-btn>
      </q-card-section>
    </q-card>
    <q-card flat class="tips q-mt-lg">
      <q-card-section>
        <div class="title">الزامات یک رمز عبور مناسب</div>
        <div class="q-mt-md text-body1 no-letter-spacing">
          <div class="row items-center">
            <div style="width: 20px">
              <q-icon name="circle" size="8px" />
            </div>
            <div class="col text-body1 no-letter-spacing">
              بهتر است از رمزهایی با طول بیش از 6 کاراکتر استفاده
              کنید.
            </div>
          </div>
          <div class="row items-center q-mt-sm">
            <div style="width: 20px">
              <q-icon name="circle" size="8px" />
            </div>
            <div class="col text-body1 no-letter-spacing">
              استفاده از حداقل یک حرف کوچک و یک حرف بزرگ توصیه می‌شود.
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  import { useAuthStore } from "src/stores";
  import { fetchWrapper } from "src/helpers";

  import ToolBar from "src/components/shared/FormToolBar.vue";
  import BackButton from "src/components/shared/Buttons/GoBackLink.vue";

  const emit = defineEmits(["submitted"]);
  const authStore = useAuthStore();

  const form = ref(null);
  const oldPassword = ref("");
  const newPassword = ref("");
  const confirmNewPassword = ref("");

  const isPwdOldPassword = ref(true);
  const isPwdNewPassword = ref(true);
  const isPwdConfirmPassword = ref(true);

  async function submitForm() {
    await form.value.validate().then((success) => {
      if (success) {
        changePassword();
      } else {
        //todo: how to show validation message to user
        alert("validation error");
      }
    });
  }

  async function changePassword() {
    await fetchWrapper
      .post("scr/users/changePassword", {
        id: authStore.user.id,
        oldPassword: oldPassword.value,
        password: newPassword.value,
        confirmPassword: confirmNewPassword.value,
      })
      .then((response) => {
        emit("submitted", response);
      })
      .finally(() => {});
  }
</script>

<style lang="scss">
  .password {
    .q-field__control {
      height: 45px;
      display: flex;
      align-items: center;
      outline: none;
    }
  }
</style>
