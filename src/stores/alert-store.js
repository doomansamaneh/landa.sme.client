import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    alert: {
      status: 200,
      showAlert: false,
      message: "",
      errors: null,
    },
  }),

  actions: {
    showAlert() {
      return this.alert && this.alert.showAlert;
    },
    hide() {
      if (this.alert) this.alert.showAlert = false;
    },
    set(message) {
      message.showAlert = true;
      this.alert = message;

      // if (message.showAlert) {
      //   setTimeout(() => {
      //     const element = document.documentElement;
      //     element.scrollTo({
      //       top: element.scrollHeight,
      //       behavior: 'smooth'
      //     });
      //   }, 0);
      // }
    },
    clear() {
      this.alert = null;
    },
  },
});
