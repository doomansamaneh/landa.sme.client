import { useInvoice } from "src/components/areas/sls/_composables/useInvoice"

export function useResetStores() {
    function reset() {
        useInvoice().reset()
    }

    return {
        reset
    }
}