import { ref } from "vue";
import { bus } from "src/helpers";
import { dateRange } from "src/constants";

const searchModel = ref({
  dateRange: dateRange.all,
  voucherTypeIds: [],
});

export function useBillSearch() {
  const clearSearch = async () => {
    searchModel.value = {
      dateRange: dateRange.all,
      voucherTypeIds: [],
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
