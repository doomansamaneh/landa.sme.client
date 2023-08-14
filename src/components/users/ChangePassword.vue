<template>
  <q-card class="change-password-card">
    <slot name="header" />
    <!-- <q-separator /> -->
    <q-form @submit="changePassword">
      <q-card-section>
        <q-input outlined v-model="oldPassword" :type="isPwdOldPassword ? 'password' : 'text'"
          :placeholder="$t('change-password-page.placeholders.old-password')" dense class="text-body" required
          lazy-rules :rules="[(val) => val !== null && val !== '']">
          <template v-slot:append>
            <q-icon :name="isPwdOldPassword ? 'visibility_off' : 'visibility'" size="xs" class="cursor-pointer"
              @click="isPwdOldPassword = !isPwdOldPassword" />
          </template>
        </q-input>
        <q-input outlined v-model="newPassword" :type="isPwdNewPassword ? 'password' : 'text'"
          :placeholder="$t('change-password-page.placeholders.new-password')" dense class="text-body" required
          lazy-rules :rules="[(val) => val !== null && val !== '']">
          <template v-slot:append>
            <q-icon :name="isPwdNewPassword ? 'visibility_off' : 'visibility'" size="xs" class="cursor-pointer"
              @click="isPwdNewPassword = !isPwdNewPassword" />
          </template>
        </q-input>

        <q-input outlined v-model="confirmNewPassword" :type="isPwdConfirmPassword ? 'password' : 'text'"
          :placeholder="$t('change-password-page.placeholders.confirm-password')" dense class="text-body" required
          lazy-rules :rules="[(val) => val !== null && val !== '']">
          <template v-slot:append>
            <q-icon :name="isPwdConfirmPassword ? 'visibility_off' : 'visibility'" size="xs" class="cursor-pointer"
              @click="isPwdConfirmPassword = !isPwdConfirmPassword" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="q-gutter-sm q-pa-md dark-1">
        <q-btn type="submit" color="light-blue-6" unelevated no-caps
          :label="$t('change-password-page.buttons.change-password')" />
        <q-btn flat size="md" no-caps :label="$t('change-password-page.buttons.cancel')" v-close-popup />
      </q-card-section>
    </q-form>
  </q-card>
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
      .finally(() => {
        //loading.value = false;
      })
  }
</script>

<style scoped>
  .change-password-card {
    width: 300px;
    /* border-radius: 9px; */
  }

  /* .change-password-btn {
    height: 40px;
    width: 60%;
  }

  .cancel-btn {
    width: 36%;
  } */
</style>