<template>
  <tool-bar title="رنگ تم و زبان" back-button />
  <q-card :class="$q.screen.gt.xs ? 'bordered' : 'no-border no-shadow'">
    <q-card-section :class="{ 'q-pa-xl': $q.screen.gt.xs, 'no-padding': $q.screen.lt.sm }">
      <div class="text-body1 no-letter-spacing q-mb-md">
        زبانی که دوست دارید با آن کار کنید را انتخاب کنید
      </div>
      <lang-switcher />
      <div class="text-body1 no-letter-spacing q-my-md">
        یک رنگ به سلیقه خود انتخاب کنید
      </div>
      <theme-selector />
    </q-card-section>
  </q-card>
</template>

<script setup>
import ThemeSelector from "src/components/shared/ThemeSelector.vue"
import LangSwitcher from "src/components/shared/SwitchLanguage.vue"
import ToolBar from "src/components/shared/ToolBar.vue"
</script>


