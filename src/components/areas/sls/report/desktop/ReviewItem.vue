<template>
  <review-data-grid :table-store="tableStore" expandable toolbar />
</template>

<script setup>
  import { useInvoiceSearch } from "../../_composables/useInvoiceSearch";
  import { reviewInvoiceItemColumns } from "../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";
  import { useSalesReview } from "src/components/areas/acc/_composables/useSalesReview";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const searchStore = useInvoiceSearch();

  const props = defineProps({
    reportStore: useSalesReview,
    dataSource: {
      type: String,
      default: "sls/report/getInvoiceDetail",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || reviewInvoiceItemColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "no",
        columns: props.columns || reviewInvoiceItemColumns,
        searchModel: searchStore.searchModel,
      }),
  });
</script>
