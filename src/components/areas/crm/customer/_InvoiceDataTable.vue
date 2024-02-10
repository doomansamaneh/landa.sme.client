<template>
  <invoice-grid
    ref="invoiceTable"
    data-source="sls/invoice/GetByCustomerData/9e54becc-9506-4075-97b5-056eaa71ebd6"
    :grid-store="gridStore ?? invoiceStore"
  />
</template>

<script setup>
import { computed, ref } from "vue"
import { useInvoiceGrid } from "../_composables/useInvoiceGrid"
import InvoiceGrid from "components/areas/sls/invoice/desktop/index/DataGrid.vue"

const props = defineProps({
  gridStore: Object
})

const invoiceStore = useInvoice()
const invoiceTable = ref(null)

</script>
