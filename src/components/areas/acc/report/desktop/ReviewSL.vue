<template>
  <review-data-grid
    :table-store="tableStore"
    toolbar
    @row-dbl-click="filterRow"
  />
</template>

<script setup>
  import { useVoucherSearch } from "../../_composables/useVoucherSearch";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";
  import { reviewSLColumns } from "../../_composables/constants";
  import { useAccountReview } from "../../_composables/useAccountReview";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const searchStore = useVoucherSearch();

  const props = defineProps({
    reportStore: useAccountReview,
    dataSource: {
      type: String,
      default: "acc/report/getSLData",
    },
    filterExpression: Array,
    store: Object,
    columns: Array,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || reviewSLColumns,
    gridStore:
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "code",
        columns: props.columns || reviewSLColumns,
        searchModel: searchStore.searchModel,
      }),
  });

  const filterRow = (row) => {
    props.reportStore?.setSelected("SL", row.id, row.title);
  };

  defineExpose({
    tableStore,
  });
</script>
