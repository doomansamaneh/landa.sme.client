<template>
  <q-page class="row justify-center items-center bg-blue-5">
    <div class="login-form">
      <q-card class="change-password-form">
        <q-card-section>
          <q-form class="" @submit="changePassword">
            <q-input
              outlined
              v-model="oldPassword"
              :type="isPwdOldPassword ? 'password' : 'text'"
              placeholder="Old Password"
              dense
              class="text-body bg-whit"
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
              placeholder="New Password"
              dense
              class="text-body bg-white"
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
              placeholder="Confirm New Password"
              dense
              class="text-body bg-white"
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
                label="Change Password"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
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

<style>
.q-card {
  width: 300px;
  border-radius: 9px;
}

.change-password-btn {
  height: 40px;
}
</style>
