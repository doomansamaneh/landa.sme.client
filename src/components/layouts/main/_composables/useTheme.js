import { ref } from "vue";
import { useQuasar } from "quasar"

const selectedTheme = ref("")

export function useTheme() {
  const $q = useQuasar()

  const store = () => {
    const darkModeisActive = localStorage.getItem("darkMode")
    if (darkModeisActive === "true") {
      $q.dark.set(true)
    }

    const selectTheme = (theme) => {
      if (selectedTheme.value) {
        document.body.classList.remove(`theme--${selectedTheme.value}`)
      }
      document.body.classList.add(`theme--${theme}`)
      selectedTheme.value = theme
      localStorage.setItem("selectedTheme", theme)
    }

    const storedTheme = localStorage.getItem("selectedTheme")
    if (storedTheme) {
      selectTheme(storedTheme)
    }
  }

  return {
    selectedTheme,
    store
  }

}

