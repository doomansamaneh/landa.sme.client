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
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";
  import { userColumns } from "../../../_composables/constants";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    title: String,
    icon: String,
    toolbar: Boolean,
    dataSource: { type: String, default: "scr/users/getGridData" },
  });
  const baseRoute = "scr/users";

  const gridStore = useBaseInfoGrid({ columns: userColumns });
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore,
  });
</script>
