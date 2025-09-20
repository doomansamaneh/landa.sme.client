<template>
  <q-card bordered>
    <slot name="header"></slot>
    <slot name="body">
      <q-card-section>
        <q-form ref="form">
          <div class="q-gutter-md">
            <custom-input
              outlined
              v-model="oldPassword"
              :type="isPwdOldPassword ? 'password' : 'text'"
              :placeholder="
                $t('change-password-page.placeholders.old-password')
              "
              input-class="text-body2"
              required
              lazy-rules
            >
              <template #append>
                <q-icon
                  :name="
                    isPwdOldPassword ? 'visibility_off' : 'visibility'
                  "
                  size="xs"
                  class="cursor-pointer"
                  @click="isPwdOldPassword = !isPwdOldPassword"
                />
              </template>
            </custom-input>

            <custom-input
              outlined
              v-model="newPassword"
              :type="isPwdNewPassword ? 'password' : 'text'"
              :placeholder="
                $t('change-password-page.placeholders.new-password')
              "
              input-class="text-body2"
              required
              lazy-rules
            >
              <template #append>
                <q-icon
                  :name="
                    isPwdNewPassword ? 'visibility_off' : 'visibility'
                  "
                  size="xs"
                  class="cursor-pointer"
                  @click="isPwdNewPassword = !isPwdNewPassword"
                />
              </template>
            </custom-input>

            <custom-input
              outlined
              v-model="confirmNewPassword"
              :type="isPwdConfirmPassword ? 'password' : 'text'"
              :placeholder="
                $t(
                  'change-password-page.placeholders.confirm-password'
                )
              "
              input-class="text-body2"
              required
              lazy-rules
            >
              <template #append>
                <q-icon
                  :name="
                    isPwdConfirmPassword
                      ? 'visibility_off'
                      : 'visibility'
                  "
                  size="xs"
                  class="cursor-pointer"
                  @click="
                    isPwdConfirmPassword = !isPwdConfirmPassword
                  "
                />
              </template>
            </custom-input>
          </div>
        </q-form>
      </q-card-section>
    </slot>

    <q-card-actions class="q-pa-md bg-main">
      <q-btn
        no-caps
        type="submit"
        @click="submitForm"
        text-color="white"
        unelevated
        padding="8px 16px"
        rounded
        class="primary-gradient primary-shadow"
      >
        {{ $t("change-password-page.buttons.change-password") }}
      </q-btn>
      <q-btn
        no-caps
        flat
        size="md"
        padding="8px 16px"
        v-close-popup
        rounded
      >
        <!-- @click="$router.go(-1)" -->
        {{ $t("shared.labels.cancel") }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useAuthStore } from "src/stores";
  import { fetchWrapper } from "src/helpers";

  import CustomInput from "components/shared/forms/CustomInput.vue";

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
    const success = await form.value.validate();
    if (success) {
      changePassword();
    }
  }

  async function changePassword() {
    await fetchWrapper
      .post("scr/users/changePassword", {
        id: authStore.currentUser.id,
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
