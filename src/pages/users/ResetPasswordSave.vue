<template>
  <q-page class="column justify-center items-center">
    <div class="">
      <q-card class="change-password-form">
        <q-card-section>
          <q-form class="" @submit="changePassword">
            <q-input
              outlined
              v-model="oldPassword"
              :type="isPwdOldPassword ? 'password' : 'text'"
              :placeholder="
                $t('change-password-page.placeholders.old-password')
              "
              dense
              class="text-body"
              required
              lazy-rules
              :rules="[(val) => val !== null && val !== '']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwdOldPassword ? 'visibility_off' : 'visibility'"
                  size="xs"
                  class="cursor-pointer"
                  @click="isPwdOldPassword = !isPwdOldPassword"
                />
              </template>
            </q-input>
            <q-input
              outlined
              v-model="newPassword"
              :type="isPwdNewPassword ? 'password' : 'text'"
              :placeholder="
                $t('change-password-page.placeholders.new-password')
              "
              dense
              class="text-body"
              required
              lazy-rules
              :rules="[(val) => val !== null && val !== '']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwdNewPassword ? 'visibility_off' : 'visibility'"
                  size="xs"
                  class="cursor-pointer"
                  @click="isPwdNewPassword = !isPwdNewPassword"
                />
              </template>
            </q-input>

            <q-input
              outlined
              v-model="confirmNewPassword"
              :type="isPwdConfirmPassword ? 'password' : 'text'"
              :placeholder="
                $t('change-password-page.placeholders.confirm-password')
              "
              dense
              class="text-body"
              required
              lazy-rules
              :rules="[(val) => val !== null && val !== '']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwdConfirmPassword ? 'visibility_off' : 'visibility'"
                  size="xs"
                  class="cursor-pointer"
                  @click="isPwdConfirmPassword = !isPwdConfirmPassword"
                />
              </template>
            </q-input>
            <div class="q-mt-lg">
              <q-btn
                unelevated
                type="submit"
                color="light-blue-6"
                size="md"
                class="change-password-btn full-width text-weight-bold q-py-sm"
                no-caps
                :label="$t('change-password-page.buttons.change-password')"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
    <div class="flex jsutify-center items-center">
      <q-btn
        flat
        unelevated
        @click="$router.push('/business')"
        class="text-weight-bolder text-white q-mt-lg"
        >بازگشت</q-btn
      >
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue"

import { useAuthStore } from "../../stores"
import { fetchWrapper } from "../../helpers"

const authStore = useAuthStore()

const oldPassword = ref("")
const newPassword = ref("")
const confirmNewPassword = ref("")

const isPwdOldPassword = ref(true)
const isPwdNewPassword = ref(true)
const isPwdConfirmPassword = ref(true)

async function changePassword() {
  await fetchWrapper
    .post("scr/users/ResetPasswordSave", {
      id: authStore.user.user.id,
      oldPassword: oldPassword.value,
      password: newPassword.value,
      confirmPassword: confirmNewPassword.value
    })
    .then((response) => {
      console.log(response)
      //handleResponse(response, data)
    })
    .finally(() => {
      //loading.value = false;
    })
}
</script>

<style scoped>
.change-password-form {
  width: 300px;
  border-radius: 9px;
}

.change-password-btn {
  height: 40px;
}
</style>
