import { defineStore } from "pinia"

export const LanguageStore = defineStore({
  id: "language",

  state: () => ({
    selectedLanguage: localStorage.getItem("selectedLanguage") || "en-US"
  }),

  actions: {
    setLanguageDirection() {
      if (this.selectedLanguage === "fa-IR") {
        document.documentElement.setAttribute("dir", "rtl")
      } else {
        document.documentElement.setAttribute("dir", "ltr")
      }
    }
  }
})
