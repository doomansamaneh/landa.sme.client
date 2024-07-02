import { ref } from "vue";
import { useComposables } from "src/stores/useComposables";
import { customerColumns } from "./constants";

const rows = ref([]);

const state = {
  firstLoad: ref(false),
  rows: ref([]),
  allSelectedIds: ref([]),
  activeRow: ref(null),
  summaryData: ref(null),
  searchModel: ref(null),
};

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  sortColumn: "name",
  sortOrder: 1,
  totalItems: 0,
  searchTerm: "",
  searchModel: "",
  filterExpression: [],
});

const columns = ref(customerColumns);

export function useCustomerGrid() {
  const composablesStore = useComposables();
  composablesStore.register({
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
