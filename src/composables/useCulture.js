import { computed } from "vue"
import { cultures } from "src/constants/enums"

export function useCulture() {
  const storageKey = "selectedLanguage"
  const cookieKey = ".Landa.SME.Culture"

  const getCulture = () => {
    const currentLanguage = localStorage.getItem(storageKey) || "fa-IR"
    const defaultCulture = cultures.code = "en"
    return cultures.find(culture => culture.code === currentLanguage) || defaultCulture
  }

  const culture = computed(() => getCulture())

  const setCulture = (code) => {
    document.body.classList.remove(`digits--${culture.value.code}`)
    localStorage.setItem(storageKey, code)

    applyCulture()
  }

  const applyCulture = () => {
    const lang = getCulture()
    document.documentElement.setAttribute("dir", lang.dir)
    document.documentElement.lang = lang.code
    document.body.classList.add(`digits--${lang.code}`)

    // Set cookie for the selected language with a one-year expiration
    const expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
    const cookieString = `${cookieKey}=${lang.code}; expires=${expirationDate.toUTCString()}; path=/`
    document.cookie = cookieString

    //todo: Refresh the page, how to remove refresh
    window.location.reload()
  }

  return {
    culture,
    setCulture
  }
}