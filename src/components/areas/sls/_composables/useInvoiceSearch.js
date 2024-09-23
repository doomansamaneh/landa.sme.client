import { ref } from "vue";
import { bus } from "src/helpers";
import { dateRange, taxSentStatus } from "src/constants";

const searchModel = ref({
  dateRange: 0,
  taxStatus: taxSentStatus.all,
});

export function useInvoiceSearch() {
  const clearSearch = async () => {
    searchModel.value = {
      dateRange: 0,
      taxStatus: taxSentStatus.all,
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
      case "taxStatus":
        value = taxSentStatus.all;
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
