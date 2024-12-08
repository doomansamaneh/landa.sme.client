<template>
  <review-data-grid :table-store="tableStore" toolbar />
</template>

<script setup>
  import { useInvoiceSearch } from "../../_composables/useInvoiceSearch";
  import { reviewProductGroupColumns } from "../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const searchStore = useInvoiceSearch();

  const props = defineProps({
    dataSource: {
      type: String,
      default: "sls/report/getInvoiceByProductGroup",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || reviewProductGroupColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "productGroupCode",
        columns: props.columns || reviewProductGroupColumns,
        searchModel: searchStore.searchModel,
      }),
  });
</script>
