<template>
  <q-btn-dropdown no-caps icon="language" :label="selectedLanguageLabel" :options="languageOptions"
    class="bg-white text-blue-7 text-bold" auto-close>
    <q-item-section>
      <q-item clickable v-for="(lang, index) in supportedLanguages" :key="index">
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
  import { ref, computed, watch } from "vue"
  import { useI18n } from "vue-i18n"

  const { locale } = useI18n({ useScope: "global" })

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

  const currentLanguage = ref(localStorage.getItem("selectedLanguage") || "fa-IR")

  const selectedLanguageLabel = computed(() => {
    const labels = {
      "en-US": "English",
      "fa-IR": "فارسی",
      ar: "العربیة"
    }
    return labels[currentLanguage.value] || ""
  })

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

    //refreshPage()
  }

  // Refresh the page
  const refreshPage = () => {
    window.location.reload()
  }

  watch(locale, (newValue) => {
    localStorage.setItem("selectedLanguage", newValue)
  })

  // const savedLanguage = localStorage.getItem("selectedLanguage")
  // if (savedLanguage) {
  //   document.body.classList.add(`digits--${savedLanguage}`)
  // }
</script>