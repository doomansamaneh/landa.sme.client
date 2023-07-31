<template>
  <q-card class="change-password-card">
    <q-item>
      <slot name="header" />
    </q-item>
    <q-separator />
    <q-form class="q-pt-lg q-pb-md q-px-md" @submit="changePassword">
      <q-input
        outlined
        v-model="nameOfUser"
        placeholder="نام"
        dense
        class="text-body"
        required
        lazy-rules
        :rules="[(val) => val !== null && val !== '']"
      />
      <q-input
        v-model="emailOfUser"
        placeholder="ایمیل"
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
      <div class="flex justify-between q-mt-lg q-mb-sm">
        <q-btn
          unelevated
          type="submit"
          color="light-blue-6"
          size="md"
          class="change-password-btn q-py-sm"
          no-caps
          label="دعوت از کاربر"
        />
        <q-btn
          unelevated
          size="md"
          class="cancel-btn text-weight-bold q-py-sm"
          no-caps
          label="انصراف"
          v-close-popup
          flat
        />
      </div>
    </q-form>
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

.user-group {
}
</style>
