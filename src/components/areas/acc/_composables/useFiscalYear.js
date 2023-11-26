import { computed, ref } from "vue"
import { sortOrder } from "src/constants/index"

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
    pageSize: 8,
    sortColumn: "title",
    sortOrder: sortOrder.descending,
    totalItems: 0,
    searchTerm: "",
})

const fiscalYear = ref(null)

const columns = ref([
    {
        name: "title",
        field: "title",
        sortable: false,
        operator: 1,
        value: "",
    }
])

export function useFiscalYear() {
    const reset = () => {
        state.firstLoad.value = false
    }

    const setFiscalYear = (year) => {
        fiscalYear.value = year
        localStorage.setItem("fiscalYear", JSON.stringify(year))
    }

    const currentYear = computed(() => {
        try {
            return fiscalYear.value ?? JSON.parse(localStorage.getItem("fiscalYear"))
        } catch (error) {
            return null
        }
    })

    return {
        columns,
        pagination,
        state,
        currentYear,

        reset,
        setFiscalYear
    }
}