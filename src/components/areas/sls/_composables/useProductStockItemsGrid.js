import { ref } from "vue";
import { productStockItemsColumns } from "./constants";

import { defaultPageSize, sortOrder, sqlOperator } from "src/constants";
import { useComposables } from "src/stores/useComposables";

//const rows = ref([])

const state = {
  firstLoad: ref(false),
  rows: ref([]),
  allSelectedIds: ref([]),
  activeRow: ref(null),
  summaryData: ref(null),
  filterExpression: [],
  searchModel: ref(),
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: "voucherNo,rowNo",
  sortOrder: sortOrder.ascending,
});

const columns = ref(productStockItemsColumns);

export function useProductStockItemsGrid(defaultFilters) {
  const composablesStore = useComposables();

  composablesStore.registerComposable({
    reset: () => {
      state.firstLoad.value = false;
      state.rows.value = [];
      setDefaultSearchModel();
    },
  });

  const filterExpression = defaultFilters ?? [];

  const setDefaultSearchModel = () => {
    state.searchModel.value = {
      // showZeroStock: true,
    };
  };

  return {
    //rows,
    columns,
    pagination,
    state,
    filterExpression,

    setDefaultSearchModel,
  };
}
