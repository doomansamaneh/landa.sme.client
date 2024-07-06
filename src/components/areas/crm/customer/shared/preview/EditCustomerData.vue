<template>
  <q-card class="dialog-card no-shadow">
    <q-card-section class="row items-center q-px-lg">
      <div class="text-h6">
        {{ title }}
      </div>
      <q-space />
      <slot name="close-icon">
        <back-button />
      </slot>
    </q-card-section>

    <q-card-section>
      <slot name="body" />
    </q-card-section>

    <actions @ok-clicked="submitForm" class="q-px-lg">
      <template #ok-label>ذخیره</template>
    </actions>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";

  import { useAuthStore } from "src/stores";
  import { fetchWrapper } from "src/helpers";

  import Actions from "src/components/shared/forms/FormCardActions.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";

  const emit = defineEmits(["submitted"]);

  const props = defineProps({
    title: String,
  });

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

<style scoped>
  .dialog-card {
    width: 600px;
    border-radius: 8px;
  }
</style>
