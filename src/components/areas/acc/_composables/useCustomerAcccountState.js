import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { customerAccountColumns } from "./constants";

const rows = ref([]);

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
});

export function useCustomerAcccountState() {
  const columns = customerAccountColumns;
  return {
    rows,
    state,
    pagination,
    columns,
  };
}
