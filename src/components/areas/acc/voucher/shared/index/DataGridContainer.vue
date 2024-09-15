<template>
  <data-grid-toolbar
    v-if="toolbar"
    :title="title"
    :table-store="tableStore"
  />

  <data-grid-table :title="title" :table-store="tableStore" />
</template>

<script setup>
  import { useVoucherState } from "src/components/areas/acc/_composables/useVoucherState";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGridToolbar from "./DataGridToolbar.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    title: String,
    toolbar: Boolean,
    dataSource: { type: String, default: "acc/voucher/getGridData" },
  });

  const voucherStore = useVoucherState();
  //const gridStore = useBaseInfoGrid(quoteStore);
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    //store: gridStore,
    store: voucherStore,
  });
</script>
