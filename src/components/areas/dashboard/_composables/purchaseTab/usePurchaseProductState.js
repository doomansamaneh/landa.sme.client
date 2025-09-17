import { ref } from "vue";
import { useComposables } from "src/stores/useComposables";
import { sortOrder } from "src/constants";

const rows = ref([]);

const state = {
  firstLoad: ref(false),
  rows: ref([]),
  allSelectedIds: ref([]),
  activeRow: ref(null),
  searchModel: ref(null),
};

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  sortColumn: "quantity",
  sortOrder: sortOrder.descending,
  totalItems: 0,
  searchTerm: "",
  searchModel: "",
  filterExpression: [],
});

export function usePurchaseProductState() {
  const composablesStore = useComposables();
  const reset = () => {
    state.firstLoad.value = false;
    pagination.value.currentPage = 1;
    //setDefaultSearchModel();
  };

  composablesStore.register({
    reset: () => {
      reset();
    },
  });

  const setDefaultSearchModel = () => {};

  return {
    rows,
    //columns,
    pagination,
    state,

    setDefaultSearchModel,
    reset,
  };
}
