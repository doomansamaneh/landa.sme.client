import { defineStore } from "pinia"

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    alert: null
  }),
  actions: {
    set(alert) {
      alert.showAlert = true
      this.alert = alert
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