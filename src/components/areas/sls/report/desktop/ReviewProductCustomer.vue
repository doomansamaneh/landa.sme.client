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
  import { reviewProductCustomerColumns } from "../../_composables/constants";
  import { useSalesReview } from "src/components/areas/acc/_composables/useSalesReview";
  import { salesReviewType, sqlOperator } from "src/constants";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const searchStore = useInvoiceSearch();

  const props = defineProps({
    reportStore: useSalesReview,
    dataSource: {
      type: String,
      default: "sls/report/getInvoiceByCustomerProduct",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || reviewProductCustomerColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "customerName",
        columns: props.columns || reviewProductCustomerColumns,
        searchModel: searchStore.searchModel,
      }),
  });

  const filterRow = (row) => {
    props.reportStore?.setItem({
      id: { productId: row.productId, customerId: row.customerId },
      title: `${row.customerName} / ${row.productTitle}`,
      type: salesReviewType.prdCrm,
    });
  };

  const setSelectedAccount = () => {
    let currentFilters = props.filterExpression || [];
    const selectedPg = props.reportStore?.getItemByType(
      salesReviewType.pg
    );

    const selectedPrd = props.reportStore?.getItemByType(
      salesReviewType.prd
    );

    const selectedCrm = props.reportStore?.getItemByType(
      salesReviewType.crm
    );

    if (selectedPrd) {
      currentFilters.push({
        fieldName: "ii.productId",
        operator: sqlOperator.equal,
        value: selectedPrd.id,
      });
    } else if (selectedPg) {
      currentFilters.push({
        fieldName: "p.productGroupId",
        operator: sqlOperator.equal,
        value: selectedPg.id,
      });
    }

    if (selectedCrm) {
      currentFilters.push({
        fieldName: "i.customerId",
        operator: sqlOperator.equal,
        value: selectedCrm.id,
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
