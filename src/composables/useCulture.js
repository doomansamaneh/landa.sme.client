import { computed } from "vue"
import { cultures } from "src/constants/enums"

export function useCulture() {
  const getCulture = () => {
    const currentLanguage = localStorage.getItem("selectedLanguage") || "fa-IR"
    const defaultCulture = cultures.code = "en"
    return cultures.filter((culture) => culture.code === currentLanguage)[0] ?? defaultCulture
  }

  const culture = computed(() => getCulture())

  const setCulture = (code) => {
    document.body.classList.remove(`digits--${culture.value.code}`)
    localStorage.setItem("selectedLanguage", code)

    applyCulture()
  }

  const applyCulture = () => {
    const lang = getCulture()
    document.documentElement.setAttribute("dir", lang.dir)
    document.documentElement.lang = lang.code
    document.body.classList.add(`digits--${lang.code}`)

    //todo: Refresh the page, how oto remove refresh
    window.location.reload()
  }

  return {
    culture,
    setCulture
  }
}
