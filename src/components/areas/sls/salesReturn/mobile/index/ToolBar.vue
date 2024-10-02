<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :title="title"
    :base-route="baseRoute"
    search-btn
    sort-btn
  ></tool-bar>
</template>

<script setup>
  import ToolBar from "../../../_shared/invoice/mobile/index/ToolBar.vue";

  const props = defineProps({
    baseRoute: { type: String, default: "sls/salesReturn" },
  });
</script>
