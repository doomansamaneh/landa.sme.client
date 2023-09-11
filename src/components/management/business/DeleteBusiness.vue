<template>
  <q-card class="dialog-card no-shadow">
    <q-card-section class="row items-center q-px-lg">
      <div class="text-h6">
        {{ $t("delete-business-page.title") }}
      </div>
      <q-space />
      <slot name="close-icon">
        <back-button />
      </slot>
    </q-card-section>
    <q-card-section>
      <q-form class="q-px-sm" @submit="changePassword" ref="form" autofocus>
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
      </q-form>
    </q-card-section>
    <actions @ok-clicked="submitForm" class="q-px-lg">
      <template #ok-label>{{
        $t("delete-business-page.buttons.delete-business")
      }}</template>
    </actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue"

import { useAuthStore } from "src/stores"
import { fetchWrapper } from "src/helpers"

import Actions from "src/components/shared/Forms/FormCardActions.vue"
import BackButton from "src/components/shared/Buttons/GoBackLink.vue"

const authStore = useAuthStore()

const emit = defineEmits(["submitted"])
const form = ref(null)

const password = ref("")
const isPwd = ref(true)

async function submitForm() {
  await form.value.validate().then((success) => {
    if (success) {
      changePassword()
    } else {
      //todo: how to show validation message to user
      alert("validation error")
    }
  })
}

async function changePassword() {
  await fetchWrapper
    .post("scr/users/changePassword", {
      id: authStore.user.id,
      oldPassword: oldPassword.value,
      password: newPassword.value,
      confirmPassword: confirmNewPassword.value
    })
    .then((response) => {
      console.log(response)
      //handleResponse(response, data)
    })
    .success(() => {
      //todo: close popup if open
    })
    .finally(() => {
      //loading.value = false;
    })
}
</script>

<style scoped>
.dialog-card {
  width: 400px;
  border-radius: 8px;
}

/* .change-password-btn {
  height: 40px;
  width: 60%;
}

.cancel-btn {
  width: 36%;
} */
</style>
