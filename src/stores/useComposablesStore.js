import { defineStore } from "pinia"

export const useComposablesStore = defineStore('composables', {
  state: () => ({
    composables: [],
  }),
  actions: {
    registerComposable(composable) {
      this.composables.push(composable);
    },
    unregisterComposable(composable) {
      this.composables = this.composables.filter(c => c !== composable);
    },
    resetAllComposables() {
      this.composables.forEach(c => c.reset());
    },
  },
})