<template>
  <review-data-grid
    :title="title"
    :table-store="tableStore"
    toolbar
    @row-dbl-click="filterRow"
  />
</template>

<script setup>
  import { useVoucherSearch } from "../../_composables/useVoucherSearch";
  import { reviewCLColumns } from "../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";
  import { useAccountReview } from "../../_composables/useAccountReview";
  import { accountTreeType } from "src/constants";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const props = defineProps({
    reportStore: useAccountReview,
    dataSource: {
      type: String,
      default: "acc/report/getCLData",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
    title: String,
  });

  const searchStore = useVoucherSearch();
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

  const filterRow = (row) => {
    props.reportStore?.setItem({
      id: row.id,
      title: `${row.code} - ${row.title}`,
      type: accountTreeType.cl,
    });
  };

  defineExpose({
    tableStore,
  });
</script>
