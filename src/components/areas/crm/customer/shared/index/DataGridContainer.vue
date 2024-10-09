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
  import { useCustomerState } from "src/components/areas/crm/_composables/useCustomerState";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    title: String,
    toolbar: Boolean,
    dataSource: { type: String, default: "crm/customer/getGridData" },
  });

  const baseRoute = "crm/customer";
  const gridStore = useCustomerState();
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore,
  });
</script>
