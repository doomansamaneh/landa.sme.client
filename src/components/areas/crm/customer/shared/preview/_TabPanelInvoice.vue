<template>
  <data-grid
    class="border-radius-lg"
    flat
    bordered
    toolbar
    multi-select
    :data-source="`sls/invoice/GetByCustomerData/${item.id}`"
    :grid-store="gridStore"
  />
</template>

<script setup>
  import { useCustomerInvoiceState } from "../../../_composables/useCustomerInvoiceState";

  import DataGrid from "src/components/areas/sls/invoice/desktop/index/_DataGrid.vue";

  const props = defineProps({
    item: Object,
  });

  const gridStore = useCustomerInvoiceState();
</script>
