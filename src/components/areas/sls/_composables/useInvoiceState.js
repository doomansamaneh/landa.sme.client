import { ref } from "vue";
import { invoiceColumns } from "./constants";
import { useInvoiceSearch } from "./useInvoiceSearch";

import {
  defaultPageSize,
  sortOrder,
  sqlOperator,
  voucherStatus,
} from "src/constants";

//const rows = ref([])
const searchStore = useInvoiceSearch();

const currentTab = ref("invoice");

const state = {
  firstLoad: ref(false),
  rows: ref([]),
  allSelectedIds: ref([]),
  activeRow: ref(null),
  summaryData: ref(null),
  filterExpression: [
    {
      fieldName: "d.StatusId",
      operator: sqlOperator.notEqual,
      value: voucherStatus.canceled,
    },
  ],
  searchModel: searchStore.searchModel,
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: "no",
  sortOrder: sortOrder.descending,
});

//const columns = ref(invoiceColumns);

export function useInvoiceState(defaultFilters) {
  const columns = invoiceColumns;
  const filterExpression = defaultFilters ?? [];

  const reset = () => {
    state.firstLoad.value = false;
  };

  return {
    //rows,
    columns,
    pagination,
    state,
    filterExpression,
    currentTab,
    reset,
  };
}
