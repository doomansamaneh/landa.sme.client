import { ref, computed } from "vue";
import { helper } from "src/helpers";
import { bus } from "src/helpers";
import { dateRange, depositType, taxSentStatus } from "src/constants";

const defaultModel = {
  dateRange: dateRange.all,
  depositType: depositType.all,
  taxStatus: taxSentStatus.all,
};
const searchModel = ref({ ...defaultModel });

export function useInvoiceSearch() {
  const clearSearch = async () => {
    searchModel.value = { ...defaultModel };
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
      case "depositType":
        value = depositType.all;
        break;
    }
    searchModel.value[item.name] = value;
    searchModel.value[item.name.replace("Title", "Id")] = value;
    searchModel.value[item.name.replace("Name", "Id")] = value;
    await applySearch();
  };

  const isFiltered = computed(
    () =>
      searchModel.value &&
      !helper.deepEqual(searchModel.value, defaultModel)
  );

  return {
    searchModel,

    clearSearch,
    removeItem,
    applySearch,
    isFiltered,
  };
}
