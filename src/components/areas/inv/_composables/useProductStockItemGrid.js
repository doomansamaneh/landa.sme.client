import { ref } from "vue";
import { productStockItemColumns } from "./constants";

import { defaultPageSize, sortOrder } from "src/constants";

export function useProductStockItemGrid(defaultFilters) {
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

  const columns = ref(productStockItemColumns);

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
