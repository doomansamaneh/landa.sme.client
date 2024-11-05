<template>
  <toolbar-container
    title="صورت سود و زیان"
    :table-store="tableStore"
  />

  <data-grid-table :table-store="tableStore" />
</template>

<script setup>
  import { useI18n } from "vue-i18n";

  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import DataGridTable from "./DataGridTable.vue";

  const tableStore = useBaseInfoGrid({
    dataSource: "",
    gridStore: "",
  });
</script>
