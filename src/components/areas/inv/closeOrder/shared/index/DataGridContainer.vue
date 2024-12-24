<template>
  <toolbar-container
    v-if="toolbar"
    :title="title"
    :table-store="tableStore"
    :base-route="baseRoute"
  />

  <data-grid-table
    :title="title"
    :icon="icon"
    :table-store="tableStore"
    :base-route="baseRoute"
  />
</template>

<script setup>
  import { useBaseInfoGrid } from "components/areas/_shared/_composables/useBaseInfoGrid";
  import { useCloseOrderState } from "../../../_composables/useCloseOrderState";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    title: String,
    icon: String,
    toolbar: Boolean,
    dataSource: { type: String, default: "inv/closeOrder/getGridData" },
  });
  const baseRoute = "inv/closeOrder";

  const voucherStore = useCloseOrderState();
  const gridStore = useBaseInfoGrid(voucherStore);
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore,
  });
</script>
