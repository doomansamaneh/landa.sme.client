import { defineStore } from "pinia"

export const useAlertStore = defineStore("alert", {
  state: () => ({
    alert: {
      status: 200,
      showAlert: false,
      message: ""
    }
  }),

  actions: {
    showAlert() {
      return this.alert && this.alert.showAlert
    },
    hide() {
      if (this.alert) this.alert.showAlert = false
    },
    set(message) {
      message.showAlert = true
      this.alert = message
    },
    clear() {
      this.alert = null
    }
  }
})