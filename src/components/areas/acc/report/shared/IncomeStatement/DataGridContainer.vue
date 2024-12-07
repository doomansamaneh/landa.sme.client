<template>
  <toolbar-container />
  <data-grid-table :title="title" />
</template>

<script setup>
  import ToolbarContainer from "./ToolbarContainer.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    title: String,
  });
</script>
