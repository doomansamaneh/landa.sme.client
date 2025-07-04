import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { invoiceColumns } from "./constants";

import {
  defaultPageSize,
  sortOrder,
  sqlOperator,
  voucherStatus,
} from "src/constants";

const columns = ref(invoiceColumns);

export function useInvoiceFilteredGrid(
  defaultFilters,
  visibleColumns
) {
  const route = useRoute();

  if (visibleColumns)
    columns.value = columns.value.filter((column) =>
      visibleColumns.includes(column.name)
    );

  const state = {
    firstLoad: ref(false),
    rows: ref([]),
    allSelectedIds: ref([]),
    activeRow: ref(null),
    filterExpression: [
      {
        fieldName: "d.StatusId",
        operator: sqlOperator.notEqual,
        value: voucherStatus.canceled,
      },
    ],
    summaryData: ref(null),
    searchModel: ref({
      dateRange: 0,
      waitToSendTax: false,
    }),
  };

  const pagination = ref({
    currentPage: 1,
    pageSize: defaultPageSize,
    sortColumn: "no",
    sortOrder: sortOrder.descending,
  });

  const filterExpression = computed(() => {
    const filters = defaultFilters ?? [];
    const remained = route.params.remained;

    if (remained === "remainedThisYear")
      filters.push({
        fieldName: "Remained",
        operator: sqlOperator.equal,
        value: "thisYear",
      });
    else if (remained === "remainedAll")
      filters.push({
        fieldName: "Remained",
        operator: sqlOperator.equal,
        value: "butThisYear",
      });

    filters.push({
      fieldName: "d.StatusId",
      operator: sqlOperator.notEqual,
      value: voucherStatus.canceled,
    });

    return filters;
  });

  const setDefaultSearchModel = () => {
    state.searchModel.value = {
      dateRange: 0,
      waitToSendTax: false,
    };
  };

  return {
    columns,
    pagination,
    state,
    filterExpression: filterExpression.value,

    setDefaultSearchModel,
  };
}
