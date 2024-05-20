import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { voucherColumns } from "./constants";

const rows = ref([]);

const state = {
  firstLoad: ref(false),
  rows,
  allSelectedIds: ref([]),
  activeRow: ref(null),
  searchModel: ref({
    dateRange: 0,
  }),
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: "no",
  sortOrder: sortOrder.descending,
});

export function useVoucherState() {
  const columns = voucherColumns;

  const setDefaultSearchModel = () => {
    state.searchModel.value = { dateRange: 0 };
  };

  return {
    rows,
    state,
    pagination,
    columns,

    setDefaultSearchModel,
  };
}
