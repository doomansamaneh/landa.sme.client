<template>
  <q-card class="change-password-card">
    <q-item>
      <slot name="header" />
    </q-item>
    <q-separator />
    <q-form class="q-pt-lg q-pb-md q-px-md" @submit="changePassword">
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
      <div class="flex justify-between q-mt-sm q-mb-sm">
        <q-btn
          unelevated
          type="submit"
          color="red-6"
          size="md"
          class="change-password-btn q-py-sm"
          no-caps
          :label="$t('delete-business-page.buttons.delete-business')"
        />
        <q-btn
          unelevated
          size="md"
          class="cancel-btn text-weight-bold q-py-sm"
          no-caps
          :label="$t('delete-business-page.buttons.cancel')"
          v-close-popup
          flat
        />
      </div>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref } from "vue"

import { useAuthStore } from "../../../stores"
import { fetchWrapper } from "../../../helpers"

const authStore = useAuthStore()

const password = ref("")
const isPwd = ref(true)

async function changePassword() {
  await fetchWrapper
    .post("scr/users/setPassword", {
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
.change-password-card {
  width: 400px;
  border-radius: 9px;
}

.change-password-btn {
  height: 40px;
  width: 60%;
}

.cancel-btn {
  width: 36%;
}
</style>
