import { ref } from "vue";
import { defaultPageSize, sortOrder } from "src/constants";
import { useComposables } from "src/stores/useComposables";
import { productColumns } from "./constants";

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
  totalItems: 0,
  searchTerm: "",
  searchModel: "",
  filterExpression: [],
});

const columns = ref(productColumns);

export function useProductGrid() {
  const composablesStore = useComposables();
  composablesStore.register({
    reset: () => {
      reset();
    },
  });

  const reset = () => {
    state.firstLoad.value = false;
  };

  return {
    //rows,
    columns,
    pagination,
    state,
    reset,
  };
}
