<template>
  <review-data-grid :table-store="tableStore" expandable toolbar />
</template>

<script setup>
  import { onMounted, onUnmounted } from "vue";
  import { bus } from "src/helpers";
  import { salesReviewType, sqlOperator } from "src/constants";
  import { useInvoiceSearch } from "../../_composables/useInvoiceSearch";
  import { reviewInvoiceItemColumns } from "../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";
  import { useSalesReview } from "src/components/areas/acc/_composables/useSalesReview";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const props = defineProps({
    reportStore: useSalesReview,
    dataSource: {
      type: String,
      default: "sls/report/getInvoiceDetail",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
  });

  const searchStore = useInvoiceSearch();

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || reviewInvoiceItemColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "no",
        columns: props.columns || reviewInvoiceItemColumns,
        searchModel: searchStore.searchModel,
      }),
  });

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

    const selectedPrdCrm = props.reportStore?.getItemByType(
      salesReviewType.prdCrm
    );

    if (selectedPrdCrm) {
      currentFilters.push({
        fieldName: "ii.productId",
        operator: sqlOperator.equal,
        value: selectedPrdCrm.id.productId,
      });
      currentFilters.push({
        fieldName: "i.customerId",
        operator: sqlOperator.equal,
        value: selectedPrdCrm.id.customerId,
      });
    } else {
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
</script>
