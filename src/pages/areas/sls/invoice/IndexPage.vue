<template>
    <desktop
        v-if="$q.screen.gt.sm"
        :grid-store="gridSotre"
    />
    <mobile
        v-else
        :grid-store="gridSotre"
    />
</template>
  
<script setup>
import Desktop from "src/components/areas/sls/invoice/desktop/index/DataGrid.vue"
import Mobile from "src/components/areas/sls/invoice/mobile/index/DataGrid.vue"

import { useInvoiceGrid } from "src/components/areas/sls/_composables/useInvoiceGrid"

const gridSotre = useInvoiceGrid()
</script>
  