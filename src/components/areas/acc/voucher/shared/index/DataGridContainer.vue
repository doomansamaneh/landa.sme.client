<template>
  <toolbar-container
    v-if="toolbar"
    :title="title"
    :table-store="tableStore"
    :base-route="baseRoute"
  />

  <data-grid-table
    :title="title"
    :table-store="tableStore"
    :base-route="baseRoute"
  />
</template>

<script setup>
  import { useVoucherState } from "src/components/areas/acc/_composables/useVoucherState";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    title: String,
    toolbar: Boolean,
    dataSource: { type: String, default: "acc/voucher/getGridData" },
  });

  const baseRoute = "acc/voucher";
  const voucherStore = useVoucherState();
  //const gridStore = useBaseInfoGrid(quoteStore);
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    //store: gridStore,
    store: voucherStore,
  });
</script>
