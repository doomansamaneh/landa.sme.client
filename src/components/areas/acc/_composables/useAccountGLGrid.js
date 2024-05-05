import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { accountGLColumns } from "./constants";

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

export function useAccountGLGrid(defaultFilters) {
  const columns = accountGLColumns;

  // const filterExpression = defaultFilters ?? [];

  return {
    state,
    columns,
    pagination,
    // filterExpression,
    // defaultFilters
  };
}
