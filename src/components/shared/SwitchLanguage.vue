<template>
  <q-btn-dropdown
    no-caps
    icon="language"
    :label="selectedLanguageLabel"
    :options="languageOptions"
    class="lang-switcher text-primary text-bold"
    auto-close
  >
    <q-item-section class="z-max">
      <q-item
        class="z-max"
        clickable
        v-for="(lang, index) in supportedLanguages"
        :key="index"
      >
        <q-item-section @click="switchLanguage(lang.code)">
          <q-item-label>{{ lang.name }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="currentLanguage === lang.code">
          <q-icon
            name="done"
            color="primary"
            size="xs"
            right
          ></q-icon>
        </q-item-section>
      </q-item>
    </q-item-section>
  </q-btn-dropdown>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { cultures } from "src/constants/enums"
import { useI18n } from "vue-i18n"

const { locale } = useI18n({ useScope: "global" })

const supportedLanguages = cultures

const currentLanguage = ref(localStorage.getItem("selectedLanguage") || "fa-IR")

const selectedLanguageLabel = computed(() => {
  const currentLanguageCode = currentLanguage.value;
  const culture = cultures.find(culture => culture.code === currentLanguageCode);
  return culture ? culture.name : "";
});

function switchLanguage(code) {
  const oldLanguage = currentLanguage.value
  currentLanguage.value = code
  locale.value = code

  const selectedLang = supportedLanguages.find((l) => l.code === code)

  localStorage.setItem("selectedLanguage", code)
  localStorage.setItem("languageDirection", selectedLang.dir)

  document.documentElement.setAttribute("dir", selectedLang.dir)
  document.documentElement.lang = code

  document.body.classList.remove(`digits--${oldLanguage}`)
  document.body.classList.add(`digits--${selectedLang.code}`)

  refreshPage()
}

// Refresh the page
const refreshPage = () => {
  window.location.reload()
}

watch(locale, (newValue) => {
  localStorage.setItem("selectedLanguage", newValue)
})

onMounted(() => {
  setDigits()
})

function setDigits() {
  const savedLanguage = localStorage.getItem("selectedLanguage")
  if (savedLanguage) {
    document.body.classList.add(`digits--${savedLanguage}`)
  }
}
</script>
