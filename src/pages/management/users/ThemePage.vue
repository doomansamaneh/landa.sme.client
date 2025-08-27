<template>
  <div
    :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''"
  >
    <div class="theme-settings-container form-container_">
      <form-toolbar
        :title="$t('shared.labels.themeAndLanguageTitle')"
      />
      <desktop />
    </div>
  </div>
</template>

<script setup>
  import Desktop from "src/components/areas/scr/users/UserTheme.vue";
  import FormToolbar from "src/components/shared/forms/FormToolbar.vue";
</script>
