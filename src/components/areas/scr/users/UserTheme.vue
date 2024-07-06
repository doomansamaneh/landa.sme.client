<template>
  <q-card class="bordered">
    <q-card-section class="q-pa-lg">
      <div class="text-body1 q-mb-lg">
        یک رنگ برای تم خود انتخاب کنید
      </div>
      <theme-selector />
    </q-card-section>
    <q-card-section class="q-pa-lg">
      <div class="text-body1 q-mb-lg">
        زبان مورد نظر خود را انتخاب کنید
      </div>
      <lang-switcher />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import ThemeSelector from "src/components/shared/ThemeSelector.vue";
  import LangSwitcher from "src/components/shared/SwitchLanguage.vue";
</script>
