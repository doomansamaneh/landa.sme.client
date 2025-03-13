<template>
  <data-grid
    :data-table-store="tableStore"
    separator="horizontal"
    flat
    numbered
    wrapCells
    dense
    toolbar
    expandable
  >
    <template #expand="{ item }">
      <voucher-preview
        :voucher-id="item.voucherId"
        :voucher-item-id="item.id"
        inside
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { onMounted, onUnmounted } from "vue";
  import { bus } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { productStockItemColumns } from "../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useProductStockSearch } from "../../_composables/useProductStockSearch";
  import { useProductStockReview } from "../../_composables/useProductStockReview";
  import { stockReviewType, sqlOperator } from "src/constants";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import VoucherPreview from "src/components/areas/acc/voucher/shared/preview/IndexView.vue";

  const props = defineProps({
    filterExpression: Array,
    reportStore: useProductStockReview,
  });

  const searchStore = useProductStockSearch();
  const tableStore = useDataTable({
    dataSource: "sls/report/getProductStockItems",
    dataColumns: productStockItemColumns,
    store: useBaseInfoGrid({
      columns: productStockItemColumns,
      filterExpression: props.filterExpression,
      searchModel: searchStore.searchModel,
      sortColumn: "productCode,voucherNo,rowNo",
    }),
  });

  const setSelectedAccount = () => {
    let currentFilters = props.filterExpression || [];
    const selectedPrd = props.reportStore?.getItemByType(
      stockReviewType.prd
    );
    const selectedPg = props.reportStore?.getItemByType(
      stockReviewType.pg
    );

    if (selectedPrd) {
      currentFilters.push({
        fieldName: "sl.ProductId",
        operator: sqlOperator.equal,
        value: selectedPrd.id,
      });
    } else if (selectedPg) {
      currentFilters.push({
        fieldName: "prd.ProductGroupId",
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
</script>
