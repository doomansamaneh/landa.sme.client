<template>
  <div class="text-body1 q-mb-lg">
    {{ $t("shared.labels.selectPreferredLanguage") }}
  </div>
  <lang-switcher />

  <div class="text-body1 q-mb-lg">
    {{ $t("shared.labels.selectThemeColor") }}
  </div>
  <theme-selector />
</template>

<script setup>
  import ThemeSelector from "src/components/shared/ThemeSelector.vue";
  import LangSwitcher from "src/components/shared/SwitchLanguage.vue";
</script>
