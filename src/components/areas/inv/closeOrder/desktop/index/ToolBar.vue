<template>
  <toolbar-desktop
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    buttons
    margin
  ></toolbar-desktop>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: { type: String, default: "inv/closeOrder" },
  });
</script>
