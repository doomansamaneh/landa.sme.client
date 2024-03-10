<template>
  <desktop v-if="$q.screen.gt.xs" :grid-store="invoiceStore" :data-source="`sls/invoice/GetByCustomerData/${$route.params.id}`" />
  <mobile v-else :grid-store="invoiceStore" :data-source="`sls/invoice/GetByCustomerData/${$route.params.id}`" />
</template>

<script setup>
import { useInvoiceFilteredGrid } from "components/areas/sls/_composables/useInvoiceFilteredGrid";

import Desktop from "components/areas/sls/invoice/desktop/index/DataGrid.vue";
import Mobile from "components/areas/sls/invoice/mobile/index/DataGrid.vue";

const invoiceStore = useInvoiceFilteredGrid(null, [
  "no",
  "date",
  "subject",
  "amount",
  "payedAmount",
  "remainedAmount",
]);
</script>
