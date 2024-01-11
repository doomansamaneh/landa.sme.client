import { ref } from "vue"
import { useFormActions } from "src/composables/useFormActions"

export function useProductGroupModel() {
    const model = ref({
        isActive: true,
    })

    const crudStore = useFormActions("cmn/productGroup", model)

    return {
        model,
        crudStore
    }
}