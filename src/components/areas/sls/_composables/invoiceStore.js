import { ref } from "vue"

const statusOptions = [{
    label: 'دائم',
    value: 'دائم'
},
{
    label: 'موقت',
    value: 'موقت'
},
{
    label: 'ابطال شده',
    value: 'ابطال شده',
}
]

// const allSelectedIds = ref([])
// const selectedRows = ref([])
// const activeRow = ref(null)
const defaultSearchModel = {
    dateRange: 0,
    waitToSendTax: false
}
const searchModel = ref(defaultSearchModel)

const pagination = ref({
    currentPage: 1,
    pageSize: 5,
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
        sortable: false,
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
        field: "dateString",
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
        template: "<div></div>",
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

export function useInvoice() {

    const setDefaultSearchModel = () => {
        searchModel.value = {
            dateRange: 0,
            waitToSendTax: false
        }
    }

    return {
        statusOptions,
        columns,
        pagination,
        searchModel,
        setDefaultSearchModel
        // selectedRows,
        // allSelectedIds,
        // activeRow
    }
}