<template>
  <review-data-grid
    :table-store="tableStore"
    toolbar
    @row-dbl-click="filterRow"
  />
</template>

<script setup>
  import { useInvoiceSearch } from "../../_composables/useInvoiceSearch";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";
  import { reviewCustomerColumns } from "../../_composables/constants";
  import { useSalesReview } from "src/components/areas/acc/_composables/useSalesReview";
  import { salesReviewType } from "src/constants";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const searchStore = useInvoiceSearch();

  const props = defineProps({
    reportStore: useSalesReview,
    dataSource: {
      type: String,
      default: "sls/report/getInvoiceByCustomer",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || reviewCustomerColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "customerName",
        columns: props.columns || reviewCustomerColumns,
        searchModel: searchStore.searchModel,
      }),
  });

  const filterRow = (row) => {
    props.reportStore?.setItem({
      id: row.id,
      title: `${row.customerName}`,
      type: salesReviewType.rc,
    });
  };
</script>
