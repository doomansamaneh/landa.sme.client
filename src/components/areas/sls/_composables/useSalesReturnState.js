import { ref } from "vue";
import { invoiceColumns } from "./constants";
import { useInvoiceSearch } from "./useInvoiceSearch";

import {
  defaultPageSize,
  sortOrder,
  sqlOperator,
} from "src/constants";
import { useComposables } from "src/stores/useComposables";

//const rows = ref([])

const searchStore = useInvoiceSearch();

const state = {
  firstLoad: ref(false),
  rows: ref([]),
  allSelectedIds: ref([]),
  activeRow: ref(null),
  summaryData: ref(null),
  filterExpression: [],
  searchModel: searchStore.searchModel,
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: "no",
  sortOrder: sortOrder.descending,
});

const columns = ref(invoiceColumns);

export function useSalesReturnState(defaultFilters) {
  const composablesStore = useComposables();

  composablesStore.register({
    reset: () => {
      reset();
      state.rows.value = [];
      setDefaultSearchModel();
    },
  });

  const reset = () => {
    state.firstLoad.value = false;
  };

  const filterExpression = defaultFilters ?? [];

  const setDefaultSearchModel = () => {
    state.searchModel.value = {
      dateRange: 0,
      waitToSendTax: false,
    };
  };

  return {
    //rows,
    columns,
    pagination,
    state,
    filterExpression,

    reset,
    setDefaultSearchModel,
  };
}
