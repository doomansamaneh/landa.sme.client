import { ref } from "vue"
import { useFormActions } from "src/composables/useFormActions"

export function useProductModel() {
    const model = ref({
        isActive: true,
    })

    const crudStore = useFormActions("cmn/product", model)

    return {
        model,
        crudStore
    }
}