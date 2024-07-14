import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { voucherColumns } from "./constants";
import { useVoucherSearch } from "./useVoucherSearch";

const rows = ref([]);
const searchStore = useVoucherSearch();

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
  sortColumn: "no",
  sortOrder: sortOrder.descending,
});

export function useVoucherState() {
  const columns = ref([...voucherColumns]);

  return {
    rows,
    state,
    pagination,
    columns,
  };
}
