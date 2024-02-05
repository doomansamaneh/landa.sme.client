import { ref } from "vue"
import { useRouter } from "vue-router"
import { Loading } from "quasar"
import { useI18n } from "vue-i18n"
import { fetchWrapper } from "src/helpers"
import { useComposables } from "src/stores/useComposables"
import { useCulture } from "src/composables/useCulture"
import { useFiscalYear } from "src/components/areas/acc/_composables/useFiscalYear"

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
    pageSize: 5,
    sortColumn: "title",
    searchField: "title",
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
    },
    {
        name: "title",
        field: "title",
    },
    {
        name: "planTitle",
        field: "planTitle",
    }
])

export function useBusinessGrid() {
    const { t } = useI18n()
    const router = useRouter()
    const loadingMessage = t("shared.messages.loading-message")
    const composablesStore = useComposables()
    const cultureStore = useCulture()
    const fiscalYearSotre = useFiscalYear()

    const reset = () => {
        state.firstLoad.value = false
        setDefaultSearchModel()
    }

    const gotoBusiness = async (item) => {
        Loading.show({
            message: loadingMessage,
            boxClass: 'bg-dark text-on-dark text-bold',
            spinnerColor: 'primary'
        })

        composablesStore.resetAllComposables()

        await fetchWrapper
            .post(`business/gotoBusiness/${item.id}`)
            .then((response) => {
                const userSetting = response.data.data.userSetting
                // router.push(`/${response.data.data.url}`)
                //todo: resolve main-route for gotoBusiness
                //alert(userSetting.currentCulture)
                //cultureStore.setCulture(userSetting.currentCulture)
                fiscalYearSotre.setFiscalYear({ id: userSetting.fiscalYearId, title: userSetting.fiscalYear })
                router.push(`/${item.id}`)
            }).finally(() => {
                Loading.hide()
            });
    }

    const setDefaultSearchModel = () => {
        state.searchModel.value = {}
    }

    return {
        rows,
        columns,
        pagination,
        state,

        setDefaultSearchModel,
        gotoBusiness,
        reset
    }
}
