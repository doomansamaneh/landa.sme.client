import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { productFlowColumns } from "./constants";
import { useProductStockSearch } from "./useProductStockSearch";

const rows = ref([]);
const searchStore = useProductStockSearch();

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
  sortColumn: "code",
  sortOrder: sortOrder.ascending,
});

export function useProductFlowState() {
  const columns = ref([...productFlowColumns]);

  return {
    rows,
    state,
    pagination,
    columns,
  };
}
