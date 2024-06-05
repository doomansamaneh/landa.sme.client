import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { receiptColumns } from "./constants";
import { useReceiptSearch } from "./useReceiptSearch";

const rows = ref([]);
const searchStore = useReceiptSearch();

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

export function useReceiptState() {
  const columns = receiptColumns;

  return {
    rows,
    state,
    pagination,
    columns,
  };
}
