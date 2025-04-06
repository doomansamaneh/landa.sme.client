import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { creditorColumns } from "./constants";

const rows = ref([]);

const state = {
  firstLoad: ref(false),
  rows: ref([]),
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

export function useCreditorsState() {
  const columns = creditorColumns;
  return {
    rows,
    state,
    pagination,
    columns,
  };
}
