import { ref } from "vue";
import { invoiceColumns } from "./constants";
import { useInvoiceSearch } from "./useInvoiceSearch";

import {
  defaultPageSize,
  sortOrder,
  sqlOperator,
  cancelStatus,
} from "src/constants";

//const rows = ref([])
const searchStore = useInvoiceSearch();

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
      value: cancelStatus,
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

  return {
    //rows,
    columns,
    pagination,
    state,
    filterExpression,
  };
}
