import { ref } from "vue";
import { invoiceColumns } from "./constants";

import { defaultPageSize, sortOrder } from "src/constants";
export function useCustomerInvoiceState(defaultFilters) {
  const pagination = ref({
    currentPage: 1,
    pageSize: defaultPageSize,
    sortColumn: "no",
    sortOrder: sortOrder.descending,
  });

  const columns = ref([...invoiceColumns]);

  const filterExpression = defaultFilters ?? [];

  return {
    //rows,
    columns,
    pagination,
    //state,
    filterExpression,
  };
}
