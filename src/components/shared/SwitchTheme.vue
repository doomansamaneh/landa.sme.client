<template>
  <div class="flex justify-between items-center q-px-xs">
    <q-toggle
      color="blue-8"
      v-model="darkMode"
      unchecked-icon="light_mode"
      checked-icon="dark_mode"
    />
    <div class="q-gutter-x-xs">
      <q-icon
        name="circle"
        size="xs"
        color="blue-5"
        class="cursor-pointer"
        icon="format_paint"
        @click="selectTheme('blue')"
      />
      <q-icon
        name="circle"
        size="xs"
        color="purple"
        class="cursor-pointer"
        @click="selectTheme('purple')"
      />
      <q-icon
        name="circle"
        size="xs"
        color="orange"
        class="cursor-pointer"
        @click="selectTheme('orange')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import { useQuasar } from "quasar"

const $q = useQuasar()

const darkMode = ref(false)
const selectedTheme = ref("")

watch(darkMode, (newVal) => {
  $q.dark.set(newVal ? "auto" : false)
  if (newVal) {
    document.body.classList.remove(`body--light`)
    document.body.classList.add(`body--dark`)
  } else {
    document.body.classList.add(`body--light`)
    document.body.classList.remove(`body--dark`)
  }
  localStorage.setItem("darkMode", newVal)
})

onMounted(() => {
  const darkModeisActive = localStorage.getItem("darkMode")
  if (darkModeisActive === "true") {
    darkMode.value = true
  }

  const storedTheme = localStorage.getItem("selectedTheme")
  if (storedTheme) {
    selectTheme(storedTheme)
  }

  setDigits()
})

const selectTheme = (theme) => {
  if (selectedTheme.value) {
    document.body.classList.remove(`theme--${selectedTheme.value}`)
  }
  document.body.classList.add(`theme--${theme}`)
  selectedTheme.value = theme
  localStorage.setItem("selectedTheme", theme)
}

function setDigits() {
  const savedLanguage = localStorage.getItem("selectedLanguage")
  if (savedLanguage) {
    document.body.classList.add(`digits--${savedLanguage}`)
  }
}

function reloadPage() {
  window.location.reload()
}
</script>
