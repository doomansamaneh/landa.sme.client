import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { transferMoneyColumns } from "./constants";
import { useTransferMoneySearch } from "./useTransferMoneySearch";

const rows = ref([]);
const searchStore = useTransferMoneySearch();

const state = {
  firstLoad: ref(false),
  rows,
  allSelectedIds: ref([]),
  activeRow: ref(null),
  summaryData: ref(null),
  searchModel: searchStore.searchModel,
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: "date",
  sortOrder: sortOrder.descending,
});

export function useTransferMoneyState() {
  const columns = transferMoneyColumns;

  const reset = () => {
    state.firstLoad.value = false;
  };

  return {
    rows,
    state,
    pagination,
    columns,
    reset,
  };
}
