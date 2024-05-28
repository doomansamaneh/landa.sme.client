<template>
  <div
    :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''"
  >
    <div class="theme-settings-container">
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6 text-weight-700 no-letter-spacing">
          رنگ تم و زبان
        </div>
        <back-button />
      </div>

      <div class="text-body1 no-letter-spacing q-mb-md">
        زبانی که دوست دارید با آن کار کنید را انتخاب کنید
      </div>
      <lang-switcher />
      <div class="text-body1 no-letter-spacing q-my-md">
        یک رنگ به سلیقه خود انتخاب کنید
      </div>
      <theme-selector />
    </div>
  </div>
</template>

<script setup>
  import ThemeSelector from "src/components/shared/ThemeSelector.vue";
  import LangSwitcher from "src/components/shared/SwitchLanguage.vue";
  import BackButton from "src/components/shared/Buttons/GoBackLink.vue";
</script>
