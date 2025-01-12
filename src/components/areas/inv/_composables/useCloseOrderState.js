import { ref } from "vue";
import { closeOrderColumns } from "./constants";

import {
  defaultPageSize,
  sortOrder,
  sqlOperator,
} from "src/constants";

const state = {
  firstLoad: ref(false),
  rows: ref([]),
  allSelectedIds: ref([]),
  activeRow: ref(null),
  summaryData: ref(null),
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: "rowNo",
  sortOrder: sortOrder.descending,
});

export function useCloseOrderState(defaultFilters) {
  const filterExpression = defaultFilters ?? [];

  const reset = () => {
    state.firstLoad.value = false;
  };

  const setDefaultSearchModel = () => {
    state.searchModel.value = {};
  };

  return {
    state,
    pagination,
    filterExpression,
    columns: closeOrderColumns,

    setDefaultSearchModel,
    reset,
  };
}
