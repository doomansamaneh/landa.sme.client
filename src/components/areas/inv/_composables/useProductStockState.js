import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { productStockColumns } from "./constants";
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

export function useProductStockState() {
  const columns = ref([...productStockColumns]);

  return {
    rows,
    state,
    pagination,
    columns,
  };
}
