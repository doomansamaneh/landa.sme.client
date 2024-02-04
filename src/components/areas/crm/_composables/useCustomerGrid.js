import { ref } from "vue"
import { useComposablesStore } from "src/stores/useComposablesStore"

const rows = ref([])

const state = {
    firstLoad: ref(false),
    rows: ref([]),
    allSelectedIds: ref([]),
    activeRow: ref(null),
    summaryData: ref(null),
    searchModel: ref(null)
}

const pagination = ref({
    currentPage: 1,
    pageSize: 10,
    sortColumn: "name",
    sortOrder: 1,
    totalItems: 0,
    searchTerm: "",
    searchModel: "",
    filterExpression: []
})

const columns = ref([
    {
        name: "name",
        field: "name",
        sortable: false,
        operator: 1,
        value: "",
    }
])

export function useCustomerGrid() {
    const composablesStore = useComposablesStore()
    composablesStore.registerComposable({
        reset: () => {
            state.firstLoad.value = false
            setDefaultSearchModel()
        }
    })

    const setDefaultSearchModel = () => {
    }

    return {
        rows,
        columns,
        pagination,
        state,

        setDefaultSearchModel,
    }
}
