<template>
  <q-card bordered>
    <q-card-section>
      <q-form ref="form" autofocus class="q-mt-lg q-px-sm">
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
              :name="
                isPwdOldPassword ? 'visibility_off' : 'visibility'
              "
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
              :name="
                isPwdNewPassword ? 'visibility_off' : 'visibility'
              "
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
              :name="
                isPwdConfirmPassword ? 'visibility_off' : 'visibility'
              "
              size="xs"
              class="cursor-pointer"
              @click="isPwdConfirmPassword = !isPwdConfirmPassword"
            />
          </template>
        </q-input>
      </q-form>
    </q-card-section>

    <actions @ok-clicked="submitForm" class="q-px-lg">
      <template #ok-label>
        {{ $t("change-password-page.buttons.change-password") }}
      </template>
    </actions>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";

  import { useAuthStore } from "src/stores";
  import { fetchWrapper } from "src/helpers";

  import Actions from "src/components/shared/forms/FormCardActions.vue";

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
        emit("submitted", response);
      })
      .finally(() => {});
  }
</script>
