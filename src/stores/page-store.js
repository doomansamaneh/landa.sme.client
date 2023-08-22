import { defineStore } from 'pinia';

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
