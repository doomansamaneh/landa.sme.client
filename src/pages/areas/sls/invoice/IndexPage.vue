<template>
    <desktop
        v-if="$q.screen.gt.xs"
        :grid-store="gridSotre"
        :title="$t('main-menu-items.Sls_Invoice_View')"
    />
    <mobile
        v-else
        :grid-store="gridSotre"
        :title="$t('main-menu-items.Sls_Invoice_View')"
    />
</template>
  
<script setup>
import Desktop from "components/areas/sls/invoice/desktop/index/DataGrid.vue"
import Mobile from "components/areas/sls/invoice/mobile/index/DataGrid.vue"

import { useInvoiceGrid } from "components/areas/sls/_composables/useInvoiceGrid"

const gridSotre = useInvoiceGrid()
</script>
  