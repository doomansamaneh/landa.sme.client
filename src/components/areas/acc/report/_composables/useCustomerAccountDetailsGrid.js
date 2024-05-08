import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { useComposables } from "src/stores/useComposables";
import { customerAccountDetailsColumns } from "./constants";

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
  sortColumn: "voucherNo",
  sortOrder: sortOrder.descending,
  // totalItems: 0,
  // filterExpression: [],
});

const columns = ref(customerAccountDetailsColumns);

export function useCustomerAccountDetailsGrid() {
  const composablesStore = useComposables();
  composablesStore.registerComposable({
    reset: () => {
      state.firstLoad.value = false;
      setDefaultSearchModel();
    },
  });

  const setDefaultSearchModel = () => {};

  return {
    rows,
    columns,
    pagination,
    state,

    setDefaultSearchModel,
  };
}
