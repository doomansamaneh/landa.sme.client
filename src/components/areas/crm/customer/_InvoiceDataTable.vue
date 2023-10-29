<template>
  <invoice-grid
    ref="invoiceTable"
    data-source="sls/invoice/GetByCustomerData/9e54becc-9506-4075-97b5-056eaa71ebd6"
    :grid-store="gridStore ?? invoiceStore"
  />
</template>

<script setup>
import { computed, ref } from "vue"
import { useInvoice } from "../_composables/useInvoice"
import InvoiceGrid from "src/components/areas/sls/invoice/_InvoiceDataTable.vue"

const props = defineProps({
  gridStore: Object
})

const invoiceStore = useInvoice()
const invoiceTable = ref(null)

</script>
