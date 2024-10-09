<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    :title="title"
    activation
    search-btn_
    sort-btn
  ></tool-bar>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import ToolBar from "components/shared/ToolBarMobile.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: { type: String, default: "crm/Customer" },
  });
</script>
