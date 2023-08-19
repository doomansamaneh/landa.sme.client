import { defineStore } from 'pinia';

export const usePaginationStore = defineStore('pagination', {
  state: () => ({
    currentPage: 1,
  }),
  actions: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
  },
});
