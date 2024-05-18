import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { voucherColumns } from "./constants";

const rows = ref([]);

const state = {
  firstLoad: ref(false),
  rows,
  allSelectedIds: ref([]),
  activeRow: ref(null),
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: "no",
  sortOrder: sortOrder.descending,
});

export function useVoucherState() {
  const columns = voucherColumns;

  return {
    rows,
    state,
    pagination,
    columns,
  };
}
