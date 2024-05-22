import { ref } from "vue";
import { bus } from "src/helpers";
import { dateRange } from "src/constants";

const searchModel = ref({
  dateRange: 0,
  waitToSendTax: false,
});

export function useInvoiceSearch() {
  const clearSearch = async () => {
    searchModel.value = {
      dateRange: 0,
      waitToSendTax: false,
    };
    await applySearch();
  };

  const applySearch = async () => {
    bus.emit("apply-search");
  };

  const removeItem = async (item) => {
    let value = "";
    switch (item.name) {
      case "dateRange":
        value = dateRange.all;
        break;
      case "waitToSendTax":
        value = false;
        break;
    }
    searchModel.value[item.name] = value;
    await applySearch();
  };

  return {
    searchModel,

    clearSearch,
    removeItem,
    applySearch,
  };
}
