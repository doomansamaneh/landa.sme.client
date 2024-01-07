import { ref } from "vue"

export function useProductGroupModel() {
    const model = ref({
        id: null,
        code: "",
        title: "",
        isActive: true,
        recordVersion: 0
    })

    return {
        model
    }
}