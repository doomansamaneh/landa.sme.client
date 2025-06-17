import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { billColumns } from "./constants";
import { useBillSearch } from "./useBillSearch";

const rows = ref([]);
const searchStore = useBillSearch();

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

export function useBillState() {
  const columns = billColumns;

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
