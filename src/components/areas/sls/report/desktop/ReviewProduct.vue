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
  import { useInvoiceSearch } from "../../_composables/useInvoiceSearch";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";
  import { reviewProductColumns } from "../../_composables/constants";
  import { useSalesReview } from "src/components/areas/acc/_composables/useSalesReview";
  import { salesReviewType, sqlOperator } from "src/constants";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const props = defineProps({
    reportStore: useSalesReview,
    dataSource: {
      type: String,
      default: "sls/report/getInvoiceByProduct",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
  });

  const searchStore = useInvoiceSearch();

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
