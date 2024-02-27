<template>
  <div class="q-pa-md">
    <invoice-grid
      :grid-store="invoiceStore"
      :data-source="`sls/invoice/GetByCustomerData/${$route.params.id}`"
    />
  </div>
</template>

<script setup>
import { useInvoiceFilteredGrid } from "components/areas/sls/_composables/useInvoiceFilteredGrid";

import InvoiceGrid from "components/areas/sls/invoice/desktop/index/DataGrid.vue";

const invoiceStore = useInvoiceFilteredGrid(null, [
  "no",
  "date",
  "subject",
  "amount",
  "payedAmount",
  "remainedAmount",
]);
</script>
