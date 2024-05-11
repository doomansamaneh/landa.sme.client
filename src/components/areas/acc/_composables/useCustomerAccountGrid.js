import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { useComposables } from "src/stores/useComposables";
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
  // totalItems: 0,
  // filterExpression: [],
});

const columns = ref(customerAccountColumns);

export function useCustomerAccountGrid() {
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
