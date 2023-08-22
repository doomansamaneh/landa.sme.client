import { defineStore } from "pinia"

export const useSelectedBusinessStore = defineStore("selected-business", {
  state: () => ({
    title: localStorage.getItem("businessTitle")
  }),
})
