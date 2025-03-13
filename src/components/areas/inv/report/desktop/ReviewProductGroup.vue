<template>
  <review-data-grid
    :table-store="tableStore"
    toolbar
    @row-dbl-click="filterRow"
  />
</template>

<script setup>
  import { onMounted, onUnmounted } from "vue";
  import { bus } from "src/helpers";
  import { useProductStockReview } from "src/components/areas/inv/_composables/useProductStockReview";
  import { useProductStockSearch } from "../../_composables/useProductStockSearch";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";
  import { productGroupStockColumns } from "../../_composables/constants";
  import { stockReviewType, sqlOperator } from "src/constants";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const props = defineProps({
    reportStore: useProductStockReview,
    dataSource: {
      type: String,
      default: "sls/report/getProductGroupStock",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
  });

  const searchStore = useProductStockSearch();

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || productGroupStockColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "code",
        columns: props.columns || productGroupStockColumns,
        searchModel: searchStore.searchModel,
      }),
  });

  const filterRow = (row) => {
    props.reportStore?.setItem({
      id: row.id,
      title: `${row.code ?? ""} - ${row.title}`,
      type: stockReviewType.pg,
    });
  };

  const reloadData = async () => {
    await tableStore.reloadData();
  };

  onMounted(() => {
    bus.on("apply-selected-account", reloadData);
  });

  onUnmounted(() => {
    bus.off("apply-selected-account", reloadData);
  });

  defineExpose({
    tableStore,
  });
</script>
