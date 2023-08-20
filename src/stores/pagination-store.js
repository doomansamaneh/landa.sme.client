import { defineStore } from 'pinia';
// (name) =>
export const usePaginationStore = (name) => defineStore(`pagination-${name}`, {
  state: () => ({
    currentPage: 1,
  }),
  actions: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
  },
})();
