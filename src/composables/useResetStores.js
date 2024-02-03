import { useInvoiceGrid } from "src/components/areas/sls/_composables/useInvoiceGrid"
import { useCustomer } from "src/components/areas/crm/_composables/useCustomer"

export function useResetStores() {
    function reset() {
        useInvoiceGrid().reset()
        useCustomer().reset()
    }

    return {
        reset
    }
}