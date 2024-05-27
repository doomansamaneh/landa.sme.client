import { ref } from "vue";
import { quoteColumns } from "./constants";
import { useInvoiceSearch } from "./useInvoiceSearch";

import { defaultPageSize, sortOrder } from "src/constants";

const searchStore = useInvoiceSearch();

const state = {
  firstLoad: ref(false),
  rows: ref([]),
  allSelectedIds: ref([]),
  activeRow: ref(null),
  summaryData: ref(null),
  searchModel: searchStore.searchModel,
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: "no",
  sortOrder: sortOrder.descending,
});

export function useQuoteState(defaultFilters) {
  const columns = quoteColumns;

  const filterExpression = defaultFilters ?? [];

  return {
    //rows,
    columns,
    pagination,
    state,
    filterExpression,
  };
}
