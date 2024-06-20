<template>
  <data-grid
    toolbar
    base-route="trs/receipt"
    data-source="trs/receipt/getGridData"
    :title="$t('main-menu-items.Trs_Receipt_View')"
    create-url="/trs/receipt/create"
    :grid-store="gridStore"
    expandable
  >
    <template #cell-amount="{ item }">
      {{ item.amount?.toLocaleString() }}
    </template>

    <template #expand="{ item }">
      <preview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { sortOrder } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { receiptColumns } from "src/components/areas/trs/_composables/constants";

  import Preview from "../preview/IndexView.vue";
  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

  const gridStore = useBaseInfoGrid({
    columns: receiptColumns,
    sortColumn: "date",
    sortOrder: sortOrder.descending,
  });
</script>
