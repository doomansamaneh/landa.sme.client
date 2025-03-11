import { ref } from "vue";
import { productStockItemColumns } from "./constants";

import { defaultPageSize, sortOrder } from "src/constants";

export function useProductStockItemGrid(defaultFilters, searchModel) {
  const state = {
    firstLoad: ref(false),
    rows: ref([]),
    allSelectedIds: ref([]),
    activeRow: ref(null),
    summaryData: ref(null),
    filterExpression: defaultFilters ?? [],
    searchModel: searchModel,
  };

  const pagination = ref({
    currentPage: 1,
    pageSize: defaultPageSize,
    sortColumn: "productCode,voucherNo,rowNo",
    sortOrder: sortOrder.ascending,
  });

  const columns = ref(productStockItemColumns);

  //const filterExpression = defaultFilters ?? [];

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
    //filterExpression,

    setDefaultSearchModel,
  };
}
