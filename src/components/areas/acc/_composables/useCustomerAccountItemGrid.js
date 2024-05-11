import { ref } from "vue";
import { customerAccountDetailsColumns } from "./constants";

import { defaultPageSize, sortOrder } from "src/constants";

export function useCustomerAccountItemGrid(defaultFilters) {
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
    sortColumn: "voucherNo",
    sortOrder: sortOrder.ascending,
  });

  const columns = ref(customerAccountDetailsColumns);

  const filterExpression = defaultFilters ?? [];

  const setDefaultSearchModel = () => {
    state.searchModel.value = {
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
