<template>
  <div class="flex justify-between items-center">
    <div class="">
      <q-toggle
        color="primary"
        v-model="darkMode"
        unchecked-icon="light_mode"
        checked-icon="dark_mode"
      />
    </div>
    <div class="row items-center q-gutter-x-xs">
      <q-icon
        v-for="(theme, themeName) in themes"
        :key="themeName"
        name="circle"
        size="xs"
        :style="{ color: getPrimaryColor(themeName) }"
        :class="getClass(themeName)"
        @click="selectTheme(themeName)"
      >
        <q-tooltip :style="{ background: getPrimaryColor(themeName) }">{{ themeName }}</q-tooltip>
      </q-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, watchEffect } from "vue"
import { useQuasar } from "quasar"

const $q = useQuasar()

const themes = {
  seyedi: {
    primary: "#00b200",
  },
  orange: {
    primary: "#ff6600",
  },
  purple: {
    primary: "#c729df",
  },
  blue: {
    primary: "#00aeff",
  },
  golden: {
    primary: "#c89002",
  },
  jigari: {
    primary: "#dc143c",
  }
}

const selectedTheme = ref("")
const darkMode = ref(false)

watch(darkMode, (newVal) => {
  $q.dark.set(newVal)
  localStorage.setItem("darkMode", newVal)
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

const getPrimaryColor = (themeName) => {
  return themes[themeName].primary
}

const getClass = (themeName) => {
  return "cursor-pointer" +
    (selectedTheme.value === themeName ? " active" : "")
}
</script>

<style scoped>
.active {
  border: 2px solid;
  border-radius: 50px;
}
</style>


