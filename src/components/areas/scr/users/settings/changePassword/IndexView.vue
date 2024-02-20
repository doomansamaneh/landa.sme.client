<template>
  <tool-bar style="margin-bottom: 56px;" title="تغییر رمز عبور" :submit-call-back="submitForm">
  </tool-bar>

  <q-card :class="$q.screen.gt.xs ? 'bordered' : 'no-border no-shadow'">
    <q-card-section :class="{ 'q-pa-xl': $q.screen.gt.xs, 'no-padding': $q.screen.lt.sm }">
      <q-form ref="form" autofocus>

        <div class="row q-col-gutter-lg" :class="$q.screen.gt.xs ? 'q-mb-lg' : 'q-mb-md'">
          <div class="col-md-6 col-sm-6 col-xs-12">
            <q-input hide-bottom-space outlined v-model="oldPassword" :type="isPwdOldPassword ? 'password' : 'text'"
              :placeholder="$t('change-password-page.placeholders.old-password')" dense class="text-body" required
              lazy-rules :rules="[(val) => val !== null && val !== '']">
              <template v-slot:append>
                <q-icon :name="isPwdOldPassword ? 'visibility_off' : 'visibility'" size="xs" class="cursor-pointer"
                  @click="isPwdOldPassword = !isPwdOldPassword" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="row" :class="$q.screen.gt.xs ? 'q-col-gutter-lg' : 'q-col-gutter-md'">
          <div class="col-md-6 col-sm-6 col-xs-12">
            <q-input hide-bottom-space outlined v-model="newPassword" :type="isPwdNewPassword ? 'password' : 'text'"
              :placeholder="$t('change-password-page.placeholders.new-password')" dense class="text-body" required
              lazy-rules :rules="[(val) => val !== null && val !== '']">
              <template v-slot:append>
                <q-icon :name="isPwdNewPassword ? 'visibility_off' : 'visibility'" size="xs" class="cursor-pointer"
                  @click="isPwdNewPassword = !isPwdNewPassword" />
              </template>
            </q-input>
          </div>
          <div class="col-md-6 col-md-6 col-xs-12">
            <q-input hide-bottom-space outlined v-model="confirmNewPassword"
              :type="isPwdConfirmPassword ? 'password' : 'text'" :placeholder="$t('change-password-page.placeholders.confirm-password')
                " dense class="text-body" required lazy-rules :rules="[(val) => val !== null && val !== '']">
              <template v-slot:append>
                <q-icon :name="isPwdConfirmPassword ? 'visibility_off' : 'visibility'" size="xs" class="cursor-pointer"
                  @click="isPwdConfirmPassword = !isPwdConfirmPassword" />
              </template>
            </q-input>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
  <!-- <div :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''">
    <q-card class="dialog-card no-shadow">
    <q-card-section class="row items-center q-px-lg">
      <div class="text-h6">
        {{ $t("change-password-page.title") }}
      </div>
      <q-space />
      <slot name="close-icon">
        <back-button />
      </slot>
    </q-card-section>

    <q-card-section>
      <q-form
        ref="form"
        autofocus
        class="q-px-sm"
      >
        <q-input
          outlined
          v-model="oldPassword"
          :type="isPwdOldPassword ? 'password' : 'text'"
          :placeholder="$t('change-password-page.placeholders.old-password')"
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
          :placeholder="$t('change-password-page.placeholders.new-password')"
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
          :placeholder="$t('change-password-page.placeholders.confirm-password')
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
      </q-form>
    </q-card-section>

    <actions
      @ok-clicked="submitForm"
      class="q-px-lg"
    >
      <template #ok-label>{{
        $t("change-password-page.buttons.change-password")
      }}</template>
    </actions>
  </q-card>
  </div> -->
</template>

<script setup>
import { ref } from "vue"

import { useAuthStore } from "src/stores"
import { fetchWrapper } from "src/helpers"

import Actions from "src/components/shared/Forms/FormCardActions.vue"
import BackButton from "src/components/shared/Buttons/GoBackLink.vue"
import ToolBar from "src/components/shared/FormToolBar.vue"

const emit = defineEmits(["submitted"])
const authStore = useAuthStore()

const form = ref(null)
const oldPassword = ref("")
const newPassword = ref("")
const confirmNewPassword = ref("")

const isPwdOldPassword = ref(true)
const isPwdNewPassword = ref(true)
const isPwdConfirmPassword = ref(true)

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
      emit("submitted", response)
    })
    .finally(() => { })
}
</script>
