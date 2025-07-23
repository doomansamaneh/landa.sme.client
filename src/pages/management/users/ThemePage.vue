<template>
  <div
    :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''"
  >
    <div class="theme-settings-container form-container_">
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6 text-weight-700">
          {{ $t("shared.labels.themeAndLanguageTitle") }}
        </div>
        <back-button />
      </div>
      <desktop />
    </div>
  </div>
</template>

<script setup>
  import Desktop from "src/components/areas/scr/users/UserTheme.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
</script>
