import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { wageColumns } from "./constants";
//import { useReceiptSearch } from "./useReceiptSearch";

const rows = ref([]);
//const searchStore = useReceiptSearch();

const state = {
  firstLoad: ref(false),
  rows,
  allSelectedIds: ref([]),
  activeRow: ref(null),
  summaryData: ref(null),
  //searchModel: searchStore.searchModel,
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: "month",
  sortOrder: sortOrder.ascending,
});

export function useWageState() {
  const columns = wageColumns;

  return {
    rows,
    state,
    pagination,
    columns,
  };
}
