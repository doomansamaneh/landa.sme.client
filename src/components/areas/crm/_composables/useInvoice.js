import { defaultPageSize, sqlOperator } from "src/constants"
import { ref } from "vue"

export function useInvoice() {
    const state = {
        firstLoad: ref(false),
        rows: ref([]),
        allSelectedIds: ref([]),
        activeRow: ref(null),
        summaryData: ref(null),
        searchModel: ref({
            dateRange: 0,
            waitToSendTax: false
        })
    }

    const pagination = ref({
        currentPage: 1,
        pageSize: defaultPageSize,
        sortColumn: "no",
        sortOrder: 1,
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
            operator: sqlOperator.equal,
            value: "",
        },
        {
            name: "date",
            field: "dateString",
            sortable: true,
            label: "تاریخ",
            class: "text-left",
            style: "width:120px;",
            showFilter: true
        },
        {
            name: "subject",
            field: "subject",
            sortable: true,
            label: "شرح",
            align: "left",
            class: "text-left",
            showFilter: true,
        },
        {
            name: "amount",
            field: "amount",
            sortable: true,
            label: "جمع کل",
            align: "left",
            class: "text-left",
            style: "width:90px;",
            showFilter: true
        },
        // {
        //     name: "discountAmount",
        //     field: "discountAmount",
        //     sortable: true,
        //     label: "تخفیف",
        //     align: "left",
        //     class: "text-left",
        //     showFilter: true
        // },
        {
            name: "statusTitle",
            field: "statusTitle",
            sortable: true,
            label: "وضعیت",
            align: "left",
            class: "text-left",
            showFilter: true,
            style: "width:100px;",
            operator: sqlOperator.equal,
            value: ""
        }
    ])

    const reset = () => {
        state.firstLoad.value = false
        setDefaultSearchModel()
    }

    const setDefaultSearchModel = () => {
        state.searchModel.value = {
            dateRange: 0,
            waitToSendTax: false
        }
    }

    return {
        columns,
        pagination,
        state,

        setDefaultSearchModel,
        reset
    }
}