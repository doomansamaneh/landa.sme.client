import { ref } from "vue"
import { defaultPageSize, sortOrder, sqlOperator } from "src/constants";

const rows = ref([])

const state = {
    firstLoad: ref(false),
    rows: ref([]),
    allSelectedIds: ref([]),
    activeRow: ref(null),
}

const pagination = ref({
    currentPage: 1,
    pageSize: defaultPageSize,
    sortColumn: "code",
    sortOrder: sortOrder.ascending,
    totalItems: 0,
    searchTerm: "",
    searchModel: "",
    filterExpression: []
})

const columns = ref([
    {
        name: "code",
        field: "code",
        sortable: true,
        label: "کد",
        class: "text-left",
        cellClass: "text-left",
        cellStyle: "",
        style: "width:100px;",
        showFilter: true,
        operator: sqlOperator.equal,
        value: "",
    },
    {
        name: "title",
        field: "title",
        sortable: true,
        label: "عنوان",
        style: "",
        showFilter: true,
        class: "text-left",
        value: ""
    },
    {
        name: "isActive",
        field: "isActive",
        sortable: true,
        label: "فعال",
        align: "left",
        class: "text-left",
        style: "width:120px;",
        showFilter: true
    }
    ,
    {
        name: "actions",
        field: "",
        sortable: false,
        label: "",
        align: "left",
        class: "text-left",
        style: "width:170px;",
        showFilter: false
    }
])

export function useProductGroupGrid() {
    const reset = () => {
        state.firstLoad.value = false
    }

    return {
        rows,
        columns,
        pagination,
        state,

        reset
    }
}