<template>
  <div :ref="printStore.printRef">
    <header-section :title="title" />
    <body-section :table-store="tableStore" />
  </div>
</template>

<script setup>
  import { usePrint } from "src/composables/usePrint";
  import { useDataTable } from "src/composables/useDataTable";

  import HeaderSection from "src/components/shared/DataTables/printPreview/HeaderSection.vue";
  import BodySection from "./BodySection.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
  });

  const printStore = usePrint();
</script>
