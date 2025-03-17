<template>
  <div
    :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''"
  >
    <div class="theme-settings-container">
      <form-toolbar :title="$t('change-password-page.title')" />
      <change-password @submitted="submitted" />
    </div>
  </div>
</template>

<script setup>
  import ChangePassword from "src/components/areas/scr/users/ChangePassword.vue";
  import FormToolbar from "src/components/shared/forms/FormToolbar.vue";
  function submitted(response) {
    $router.go(-1);
  }
</script>
