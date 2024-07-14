<template>
  <data-grid
    flat
    :data-source="`sls/quote/GetByCustomerData/${item.id}`"
    :grid-store="gridStore"
  />
</template>

<script setup>
  import { useCustomerQuoteState } from "../../../_composables/useCustomerQuoteState";

  import DataGrid from "src/components/areas/sls/quote/desktop/index/DataGrid.vue";

  const props = defineProps({
    item: Object,
  });

  const gridStore = useCustomerQuoteState();
</script>
