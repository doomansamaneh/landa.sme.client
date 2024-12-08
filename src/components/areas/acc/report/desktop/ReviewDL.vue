<template>
  <review-data-grid :table-store="tableStore" toolbar />
</template>

<script setup>
  import { useVoucherSearch } from "../../_composables/useVoucherSearch";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";
  import { reviewDLColumns } from "../../_composables/constants";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const searchStore = useVoucherSearch();

  const props = defineProps({
    dataSource: {
      type: String,
      default: "acc/report/getDLData",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || reviewDLColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "code",
        columns: props.columns || reviewDLColumns,
        searchModel: searchStore.searchModel,
      }),
  });

  defineExpose({
    tableStore,
  });
</script>
