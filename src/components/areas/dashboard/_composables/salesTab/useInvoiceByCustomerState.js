import { ref } from "vue";

const state = {
  firstLoad: ref(false),
  data: ref(null),
};

export function useInvoiceByCustomerState() {
  return {
    state,
  };
}
