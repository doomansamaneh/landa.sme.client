import { ref } from "vue";
import { quoteColumns } from "./constants";

import { defaultPageSize, sortOrder } from "src/constants";
export function useCustomerQuoteState(defaultFilters) {
  const pagination = ref({
    currentPage: 1,
    pageSize: defaultPageSize,
    sortColumn: "no",
    sortOrder: sortOrder.descending,
  });

  const columns = ref([...quoteColumns]);

  const filterExpression = defaultFilters ?? [];

  return {
    //rows,
    columns,
    pagination,
    //state,
    filterExpression,
  };
}
