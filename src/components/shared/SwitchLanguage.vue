<template>
  <q-btn-dropdown
    no-caps
    icon="language"
    :label="selectedLanguageLabel"
    :options="languageOptions"
    class="bg-white text-blue-7 text-bold"
    auto-close
  >
    <q-item-section>
      <q-item
        clickable
        v-for="(lang, index) in supportedLanguages"
        :key="index"
      >
        <q-item-section @click="switchLanguage(lang.code)">
          <q-item-label>{{ lang.name }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="currentLanguage === lang.code">
          <q-icon name="done" color="primary" size="xs" right></q-icon>
        </q-item-section>
      </q-item>
    </q-item-section>
  </q-btn-dropdown>
</template>

<script setup>
import {
  ref,
  onBeforeUnmount,
  onMounted,
  watchEffect,
  computed,
  watch
} from "vue"

import { useI18n } from "vue-i18n"
const { locale } = useI18n({ useScope: "global" })

// Change Language with Refresh
const supportedLanguages = [
  {
    code: "en-US",
    name: "English",
    dir: "ltr",
    quasarLang: "en-US" // add Quasar language code for each language
  },
  {
    code: "fa-IR",
    name: "فارسی",
    dir: "rtl",
    quasarLang: "fa-IR"
  },
  {
    code: "ar",
    name: "العربیة",
    dir: "rtl",
    quasarLang: "ar"
  }
]

const currentLanguage = ref(
  // Get the saved language from local storage or use the default language
  localStorage.getItem("selectedLanguage") || "fa-IR"
)
const selectedLanguageLabel = computed(() => {
  switch (currentLanguage.value) {
    case "en-US":
      return "English"
    case "fa-IR":
      return "فارسی"
    case "ar":
      return "العربیة"
    default:
      return ""
  }
})

// Add computed property for selected language code
const selectedLangCode = computed(() => {
  return currentLanguage.value
})

function switchLanguage(code) {
  const oldLanguage = currentLanguage.value
  currentLanguage.value = code
  locale.value = code

  // Find selected language from supportedLanguages
  const selectedLang = supportedLanguages.find((l) => l.code === code)

  // Save language to local storage
  localStorage.setItem("selectedLanguage", code)
  localStorage.setItem("languageDirection", selectedLang.dir)

  // Update direction for current page
  document.documentElement.setAttribute("dir", selectedLang.dir)

  // Update lang for current page
  document.documentElement.lang = code

  // Remove previous digits-- class from body element
  document.body.classList.remove(`digits--${oldLanguage}`)

  // Add class to body element
  document.body.classList.add(`digits--${selectedLang.code}`)

  refreshPage()
}

// Watch for changes in the selected language and update local storage
watch(locale, (newValue) => {
  localStorage.setItem("selectedLanguage", newValue)
})

// Add the class on page load
onMounted(() => {
  const savedLanguage = localStorage.getItem("selectedLanguage")
  if (savedLanguage) {
    document.body.classList.add(`digits--${savedLanguage}`)
  }
})

// Refresh the page
const refreshPage = () => {
  window.location.reload()
}

// Watch for changes in the current page URL
watchEffect(() => {
  // Remove the class from body element
  document.body.classList.forEach((className) => {
    if (className.startsWith("digits--")) {
      document.body.classList.remove(className)
    }
  })

  // Add class to body element based on the stored language code
  const savedLanguage = localStorage.getItem("selectedLanguage")
  if (savedLanguage) {
    document.body.classList.add(`digits--${savedLanguage}`)
  }
})
</script>
