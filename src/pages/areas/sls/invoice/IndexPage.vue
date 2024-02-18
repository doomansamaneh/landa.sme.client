<template>
    <!-- <mobile
        :grid-store="gridStore"
        :title="$t('main-menu-items.Sls_Invoice_View')"
    /> -->

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
import { sqlOperator } from "src/constants"

import Desktop from "components/areas/sls/invoice/desktop/index/DataGrid.vue"
import Mobile from "components/areas/sls/invoice/mobile/index/DataGrid.vue"

import { useInvoiceGrid } from "components/areas/sls/_composables/useInvoiceGrid"

const gridStore = useInvoiceGrid([{
    fieldName: "d.StatusId",
    operator: sqlOperator.notEqual,
    value: "a36af633-d0bb-4857-a542-364e12658d1c"
}])
</script>
  