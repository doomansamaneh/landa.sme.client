<template>
  <q-card class="change-password-card">
    <q-item>
      <slot name="header" />
    </q-item>
    <q-form class="q-pt-lg q-pb-md q-px-md" @submit="changePassword">
      <q-input
        outlined
        v-model="nameOfUser"
        :placeholder="$t('invite-user-page.placeholders.name')"
        dense
        class="text-body"
        required
        lazy-rules
        :rules="[(val) => val !== null && val !== '']"
      />
      <q-input
        v-model="emailOfUser"
        :placeholder="$t('invite-user-page.placeholders.email')"
        dense
        class="noen-border text-body"
        required
        lazy-rules
        outlined
        :rules="[(val) => val !== null && val !== '']"
      />
      <q-select
        outlined
        v-model="multiple"
        multiple
        dense
        :options="userGroup"
        hide-dropdown-icon
        use-chips
        hint="می‌خواهید کاربر عضو چه گروهی باشد؟"
        hide-hint
        class="user-group"
      >
        <template #append>
          <q-icon
            name="o_manage_accounts"
            class="show-lookup-icon cursor-pointer"
            size="sm"
          />
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" class="q-py-md q-px-lg">
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" class="dark-3" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template></q-select
      >
    </q-form>
    <q-card-actions class="row q-pa-md dark-1">
      <q-btn
        unelevated
        @click="submitForm"
        type="submit"
        color="light-blue-6"
        padding="8px 16px"
        class="change-password-btn q-py-sm"
        no-caps
        :label="$t('invite-user-page.buttons.invite-user')"
      />
      <q-btn
        unelevated
        size="md"
        padding="8px 16px"
        class="cancel-btn q-py-sm"
        no-caps
        :label="$t('invite-user-page.buttons.cancel')"
        v-close-popup
        flat
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue"

import { useAuthStore } from "../../stores"
import { fetchWrapper } from "../../helpers"

const authStore = useAuthStore()

const nameOfUser = ref("")
const emailOfUser = ref("")
const multiple = ref(null)
const userGroup = [
  {
    label: "گزارشگیری فقط مشاهده",
    value: "گزارشگیری فقط مشاهده",
    description: "گزارشگیری فقط مشاهده",
    icon: "o_visibility"
  },
  {
    label: "کارشناس فروش",
    value: "کارشناس فروش",
    description: "کارشناس فروش",
    icon: "o_payments"
  },
  {
    label: "کارشناس خرید",
    value: "کارشناس خرید",
    description: "کارشناس خرید",
    icon: "o_shopping_bag"
  },
  {
    label: "مدیران ارشد",
    value: "مدیران ارشد",
    description: "مدیران ارشد",
    icon: "o_stars"
  },
  {
    label: "کارشناس دریافت و پرداخت",
    value: "کارشناس دریافت و پرداخت",
    description: "کارشناس دریافت و پرداخت",
    icon: "o_credit_card"
  },
  {
    label: "حسابدار - کارشناس",
    value: "حسابدار - کارشناس",
    description: "حسابدار - کارشناس",
    icon: "o_badge"
  }
]

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
.change-password-card {
  width: 400px;
  border-radius: 9px;
}

/* .change-password-btn {
  height: 40px;
  width: 60%;
}

.cancel-btn {
  width: 36%;
} */
</style>
