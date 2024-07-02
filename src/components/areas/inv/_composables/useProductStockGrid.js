import { ref } from "vue";
import { productStockColumns } from "./constants";

import {
  defaultPageSize,
  sortOrder,
  sqlOperator,
} from "src/constants";

import { useComposables } from "src/stores/useComposables";

//const rows = ref([])

const state = {
  firstLoad: ref(false),
  rows: ref([]),
  allSelectedIds: ref([]),
  activeRow: ref(null),
  summaryData: ref(null),
  filterExpression: [],
  searchModel: ref({ showZeroStock: false }),
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: "code",
  sortOrder: sortOrder.ascending,
});

const columns = ref(productStockColumns);

export function useProductStockGrid(defaultFilters) {
  const composablesStore = useComposables();

  composablesStore.register({
    reset: () => {
      state.firstLoad.value = false;
      state.rows.value = [];
      setDefaultSearchModel();
    },
  });

  const filterExpression = defaultFilters ?? [];

  const setDefaultSearchModel = () => {
    state.searchModel.value = {
      showZeroStock: false,
    };
  };

  return {
    columns,
    pagination,
    state,
    filterExpression,

    setDefaultSearchModel,
  };
}
