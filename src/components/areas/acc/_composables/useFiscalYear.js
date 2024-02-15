import { computed, ref } from "vue"
import { sortOrder } from "src/constants/index"
import { fetchWrapper, bus } from "src/helpers"
import { useComposables } from "src/stores/useComposables"

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
    const composablesStore = useComposables()
    composablesStore.registerComposable({
        reset: () => {
            state.firstLoad.value = false
        }
    })

    const changeFiscalYear = async (year) => {
        await fetchWrapper.post(`scr/userSetting/setFiscalYear/${year.id}`)
        setFiscalYear(year)
        composablesStore.resetAllComposables()
        bus.emit("render-page")
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

        setFiscalYear,
        changeFiscalYear
    }
}
