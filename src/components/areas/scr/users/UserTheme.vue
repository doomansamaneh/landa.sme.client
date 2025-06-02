<template>
  <div class="text-body1 q-mb-lg">
    زبان مورد نظر خود را انتخاب کنید
  </div>
  <lang-switcher />

  <div class="text-body1 q-mb-lg">یک رنگ برای تم خود انتخاب کنید</div>
  <theme-selector />
</template>

<script setup>
  import ThemeSelector from "src/components/shared/ThemeSelector.vue";
  import LangSwitcher from "src/components/shared/SwitchLanguage.vue";
</script>
