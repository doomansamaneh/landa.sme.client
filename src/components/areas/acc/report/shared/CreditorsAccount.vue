<template>
  <report
    data-source="acc/report/getCreditorsData"
    :grid-store="gridStore"
    :title="title"
  />
</template>

<script setup>
  import Report from "./AccountReport.vue";

  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useCreditorsState } from "src/components/areas/acc/_composables/useCreditorsState";

  const props = defineProps({
    title: String,
  });
  
  const accountStore = useCreditorsState();
  const gridStore = useBaseInfoGrid(accountStore);
</script>
