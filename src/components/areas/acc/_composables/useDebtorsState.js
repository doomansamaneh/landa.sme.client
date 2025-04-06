import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { debtorColumns } from "./constants";

const rows = ref([]);

const state = {
  firstLoad: ref(false),
  rows,
  allSelectedIds: ref([]),
  activeRow: ref(null),
  summaryData: ref(null),
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: "code",
  sortOrder: sortOrder.ascending,
});

export function useDebtorsState() {
  const columns = debtorColumns;
  return {
    rows,
    state,
    pagination,
    columns,
  };
}
