<template>
  <data-grid
    toolbar
    base-route="trs/bill"
    data-source="trs/bill/getGridData"
    :title="$t('main-menu-items.Trs_Bill_View')"
    create-url="/trs/bill/create"
    :grid-store="gridStore"
    expandable
  >
    <template #cell-amount="{ item }">
      {{ item.amount?.toLocaleString() }}
    </template>
  </data-grid>
</template>

<script setup>
  import { sortOrder } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { billColumns } from "src/components/areas/trs/_composables/constants";

  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
  const gridStore = useBaseInfoGrid({
    columns: billColumns,
    sortColumn: "date",
    sortOrder: sortOrder.descending,
  });
</script>
