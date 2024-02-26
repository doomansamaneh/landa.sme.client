<template>
  <desktop
    v-if="$q.screen.gt.xs"
    :grid-store="gridStore"
    :title="$t('main-menu-items.Sls_Invoice_View')"
  />
  <mobile
    v-else
    :grid-store="gridStore"
    :title="$t('main-menu-items.Sls_Invoice_View')"
  />
</template>

<script setup>
import { useInvoiceFilteredGrid } from "components/areas/sls/_composables/useInvoiceFilteredGrid";

import Desktop from "components/areas/sls/invoice/desktop/index/DataGrid.vue";
import Mobile from "components/areas/sls/invoice/mobile/index/DataGrid.vue";

const gridStore = useInvoiceFilteredGrid();
</script>
