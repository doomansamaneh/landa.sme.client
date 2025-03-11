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
  import { productStockColumns } from "../../_composables/constants";
  import { salesReviewType, sqlOperator } from "src/constants";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const props = defineProps({
    reportStore: useProductStockReview,
    dataSource: {
      type: String,
      default: "sls/report/getProductStock",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
  });

  const searchStore = useProductStockSearch();

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || productStockColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "code",
        columns: props.columns || productStockColumns,
        searchModel: searchStore.searchModel,
      }),
  });

  const filterRow = (row) => {
    props.reportStore?.setItem({
      id: row.id,
      title: `${row.productCode} - ${row.productTitle}`,
      type: salesReviewType.prd,
    });
  };

  const setSelectedAccount = () => {
    let currentFilters = props.filterExpression || [];
    const selectedPg = props.reportStore?.getItemByType(
      salesReviewType.pg
    );
    if (selectedPg) {
      currentFilters.push({
        fieldName: "p.productGroupId",
        operator: sqlOperator.equal,
        value: selectedPg.id,
      });
    }
    tableStore.setFilterExpression(currentFilters);
  };

  setSelectedAccount();

  const reloadData = async () => {
    setSelectedAccount();
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
