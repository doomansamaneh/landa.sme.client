<template>
  <review-data-grid
    :table-store="tableStore"
    toolbar
    @row-dbl-click="alertRow"
  />
</template>

<script setup>
  import { useVoucherSearch } from "../../_composables/useVoucherSearch";
  import { reviewCLColumns } from "../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";
  import { useAccountReview } from "../../_composables/useAccountReview";

  const searchStore = useVoucherSearch();

  const props = defineProps({
    reportStore: useAccountReview,
    dataSource: {
      type: String,
      default: "acc/report/getCLData",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || reviewCLColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "code",
        columns: props.columns || reviewCLColumns,
        searchModel: searchStore.searchModel,
      }),
  });

  const alertRow = (row) => {
    props.reportStore?.setSelectedCL(row.id, row.title);
  };

  defineExpose({
    tableStore,
  });
</script>
