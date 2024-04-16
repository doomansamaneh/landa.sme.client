import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { accountSLColumns } from "./constants";

const state = {
  firstLoad: ref(false),
  rows: ref([]),
  allSelectedIds: ref([]),
  activeRow: ref(null),
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: "code",
  sortOrder: sortOrder.ascending,
  // totalItems: 0,
  // filterExpression: [],
});

export function useAccountSLGrid() {
  const columns = accountSLColumns;
  return {
    state,
    columns,
    pagination,
  };
}
