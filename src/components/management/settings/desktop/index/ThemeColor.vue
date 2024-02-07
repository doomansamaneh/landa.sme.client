<template>
  <q-card class="bordered">
    <q-card-section class="q-pa-lg">
      <div class="text-body1">یک رنگ برای تم خود انتخاب کنید</div>
      <div class="row items-center q-pt-md">
        <theme-selector />
      </div>
    </q-card-section>
    <q-card-section class="q-pa-lg">
      <div class="text-body1">زبان مورد نظر خود را انتخاب کنید</div>
      <div class="row items-center q-pt-md">
        <lang-switcher />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import ThemeSelector from "src/components/shared/ThemeSelector.vue"
import LangSwitcher from "src/components/shared/SwitchLanguage.vue"


</script>

