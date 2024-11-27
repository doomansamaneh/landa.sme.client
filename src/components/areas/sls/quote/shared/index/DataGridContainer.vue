<template>
  <toolbar-container
    v-if="toolbar"
    :title="$q.screen.xs ? title : null"
    :table-store="tableStore"
  />

  <data-grid-table :title="title" :table-store="tableStore" />
</template>

<script setup>
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useQuoteState } from "../../../_composables/useQuoteState";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    toolbar: Boolean,
    dataSource: { type: String, default: "sls/quote/getGridData" },
    title: String,
  });

  const quoteStore = useQuoteState();
  const gridStore = useBaseInfoGrid(quoteStore);
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore,
  });
</script>
