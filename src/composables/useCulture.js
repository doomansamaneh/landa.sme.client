import { computed } from "vue"
import { cultures } from "src/constants/enums"

export function useCulture() {
  const culture = computed(() => {
    const currentLanguage = localStorage.getItem("selectedLanguage") || "fa-IR"
    const defaultCulture = cultures.code = "en"
    return cultures.filter((culture) => culture.code === currentLanguage)[0] ?? defaultCulture
  })

  return {
    culture
  }
}
