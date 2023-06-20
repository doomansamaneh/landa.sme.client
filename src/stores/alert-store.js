import { defineStore } from "pinia"

export const useAlertStore = defineStore("alert", {
  state: () => ({
    alert: null
  }),
  
  actions: {
    set(message) {
      message.showAlert = true
      this.alert = message
    },
    clear() {
      if (!navigator.onLine) {
        this.set({
          status: 100,
          type: "info",
          message: "login-page.network-error",
          showAlert: true
        })
      } else {
        this.alert = null
      }
    }
  }
})