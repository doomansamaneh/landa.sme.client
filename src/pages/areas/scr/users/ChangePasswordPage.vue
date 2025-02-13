<template>
  <div
    :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''"
  >
    <div class="theme-settings-container">
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6 text-weight-700">
          {{ $t("change-password-page.title") }}
        </div>
        <back-button />
      </div>
      <change-password @submitted="submitted"></change-password>
    </div>
  </div>
</template>

<script setup>
  import ChangePassword from "src/components/areas/scr/users/ChangePassword.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";

  function submitted(response) {
    $router.go(-1);
  }
</script>
