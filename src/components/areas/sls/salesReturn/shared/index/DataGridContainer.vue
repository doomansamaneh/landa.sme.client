<template>
  <toolbar-container
    v-if="toolbar"
    :table-store="tableStore"
    :title="$q.screen.gt.xs ? null : title"
  />

  <data-grid-table :title="title" :table-store="tableStore" />
</template>

<script setup>
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useSalesReturnState } from "../../../_composables/useSalesReturnState";
  //import { useQuoteState } from "../../../_composables/useQuoteState";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    toolbar: Boolean,
    dataSource: {
      type: String,
      default: "sls/salesReturn/getGridData",
    },
    title: String,
  });

  const salesReturnStore = useSalesReturnState();
  const gridStore = useBaseInfoGrid(salesReturnStore);
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore,
  });
</script>
