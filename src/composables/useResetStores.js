import { useInvoice } from "src/components/areas/sls/_composables/useInvoice"
import { useCustomer } from "src/components/areas/crm/_composables/useCustomer"

export function useResetStores() {
    function reset() {
        useInvoice().reset()
        useCustomer().reset()
    }

    return {
        reset
    }
}