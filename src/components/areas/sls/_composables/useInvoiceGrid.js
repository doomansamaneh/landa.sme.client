import { defaultPageSize } from "src/constants"
import { useComposables } from "src/stores/useComposables"

import { ref } from "vue"

const rows = ref([])

const state = {
    firstLoad: ref(false),
    rows: ref([]),
    allSelectedIds: ref([]),
    activeRow: ref(null),
    summaryData: ref(null),
    searchModel: ref({
        dateRange: 0,
        waitToSendTax: false
    }),
}

const pagination = ref({
    currentPage: 1,
    pageSize: defaultPageSize,
    sortColumn: "no",
    sortOrder: 1,
    totalItems: 0,
    searchTerm: "",
    searchModel: "",
    filterExpression: []
})

const columns = ref([
    {
        name: "no",
        field: "no",
        sortable: true,
        label: "شماره",
        class: "text-left",
        cellClass: "text-left",
        cellStyle: "",
        style: "width:100px;",
        showFilter: true,
        operator: 1,
        value: "",
    },
    {
        name: "date",
        field: "date",
        template: "{{dateString}}",
        sortable: true,
        label: "تاریخ",
        class: "text-left",
        showFilter: true
    },
    {
        name: "customerName",
        field: "customerName",
        sortable: true,
        label: "مشتری",
        style: "",
        template: "{{customerCode}} {{customerName}}",
        showFilter: true,
        class: "text-left",
        value: ""
    },
    {
        name: "subject",
        field: "subject",
        sortable: true,
        label: "شرح",
        align: "left",
        class: "text-left",
        showFilter: true,
        style: "width:20%"
    },
    {
        name: "amount",
        field: "amount",
        sortable: true,
        label: "جمع کل",
        align: "left",
        class: "text-left",
        showFilter: true
    },
    {
        name: "discountAmount",
        field: "discountAmount",
        sortable: true,
        label: "تخفیف",
        align: "left",
        class: "text-left",
        showFilter: true
    },
    {
        name: "typeTitle",
        field: "typeTitle",
        sortable: true,
        label: "نوع",
        align: "left",
        class: "text-left",
        showFilter: true
    },
    {
        name: "statusTitle",
        field: "statusTitle",
        sortable: true,
        label: "وضعیت",
        align: "left",
        class: "text-left",
        showFilter: true,
        style: "width:100px;",
        value: ""
    }
])

export function useInvoiceGrid(defaultFilters) {
    const composablesStore = useComposables()
    composablesStore.registerComposable({
        reset: () => {
            state.firstLoad.value = false
            setDefaultSearchModel()
        }
    })

    // if (defaultState != null) Object.assign(state, defaultState)
    const filterExpression = defaultFilters;

    const setDefaultSearchModel = () => {
        state.searchModel.value = {
            dateRange: 0,
            waitToSendTax: false
        }
    }

    return {
        rows,
        columns,
        pagination,
        state,
        filterExpression,

        setDefaultSearchModel,
    }
}