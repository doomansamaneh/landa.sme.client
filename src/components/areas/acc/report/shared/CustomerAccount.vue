<template>
  <report :title="title" :grid-store="gridStore" />
</template>

<script setup>
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useCustomerAcccountState } from "src/components/areas/acc/_composables/useCustomerAcccountState";

  import Report from "./AccountReport.vue";

  const props = defineProps({
    title: String,
  });

  const accountStore = useCustomerAcccountState();
  const gridStore = useBaseInfoGrid(accountStore);
</script>
