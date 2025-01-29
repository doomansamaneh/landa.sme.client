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
  import { useDataTable } from "src/composables/useDataTable";
  import { useProductStockItemGrid } from "src/components/areas/inv/_composables/useProductStockItemGrid";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import VoucherPreview from "src/components/areas/acc/voucher/shared/preview/IndexView.vue";

  const props = defineProps({
    filterExperssion: Array,
  });

  const tableStore = useDataTable({
    dataSource: "sls/report/getProductStockItems",
    store: useProductStockItemGrid(props.filterExperssion),
  });
</script>
