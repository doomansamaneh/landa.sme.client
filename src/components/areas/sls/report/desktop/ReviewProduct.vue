<template>
  <review-data-grid :table-store="tableStore" toolbar />
</template>

<script setup>
  import { useInvoiceSearch } from "../../_composables/useInvoiceSearch";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";
  import { reviewProductColumns } from "../../_composables/constants";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const searchStore = useInvoiceSearch();

  const props = defineProps({
    dataSource: {
      type: String,
      default: "sls/report/getInvoiceByProduct",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || reviewProductColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "productCode",
        columns: props.columns || reviewProductColumns,
        searchModel: searchStore.searchModel,
      }),
  });
</script>
