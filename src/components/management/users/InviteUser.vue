<template>
  <q-card class="dialog-card no-shadow">
    <q-card-section class="row items-center q-px-lg">
      <div class="text-h6">
        {{ $t("invite-user-page.title") }}
      </div>
      <q-space />
      <slot name="close-icon">
        <back-button />
      </slot>
    </q-card-section>
    <q-card-section>
      <q-form
        class="q-px-sm"
        @submit="changePassword"
        ref="form"
        autofocus
      >
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
          :hint="$t('invite-user-page.select-group-caption')"
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
                <q-item-label caption>
                  {{ scope.opt.description }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-form>
    </q-card-section>
    <actions @ok-clicked="submitForm" class="q-px-lg">
      <template #ok-label>
        {{ $t("invite-user-page.buttons.invite-user") }}
      </template>
    </actions>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";

  import { useAuthStore } from "src/stores";
  import { fetchWrapper } from "src/helpers";

  import Actions from "src/components/shared/forms/FormCardActions.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";

  const authStore = useAuthStore();

  const emit = defineEmits(["submitted"]);
  const form = ref(null);

  const nameOfUser = ref("");
  const emailOfUser = ref("");
  const multiple = ref(null);
  const userGroup = [
    {
      label: "گزارشگیری فقط مشاهده",
      value: "گزارشگیری فقط مشاهده",
      description: "گزارشگیری فقط مشاهده",
      icon: "o_visibility",
    },
    {
      label: "کارشناس فروش",
      value: "کارشناس فروش",
      description: "کارشناس فروش",
      icon: "o_payments",
    },
    {
      label: "کارشناس خرید",
      value: "کارشناس خرید",
      description: "کارشناس خرید",
      icon: "o_shopping_bag",
    },
    {
      label: "مدیران ارشد",
      value: "مدیران ارشد",
      description: "مدیران ارشد",
      icon: "o_stars",
    },
    {
      label: "کارشناس دریافت و پرداخت",
      value: "کارشناس دریافت و پرداخت",
      description: "کارشناس دریافت و پرداخت",
      icon: "o_credit_card",
    },
    {
      label: "حسابدار - کارشناس",
      value: "حسابدار - کارشناس",
      description: "حسابدار - کارشناس",
      icon: "o_badge",
    },
  ];

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
        console.log(response);
        //handleResponse(response, data)
      })
      .success(() => {
        //todo: close popup if open
      })
      .finally(() => {
        //loading.value = false;
      });
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
