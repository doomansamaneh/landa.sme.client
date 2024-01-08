import { ref } from "vue"
import { defaultPageSize } from "src/constants";

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
    sortOrder: 1,
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
        operator: 1,
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

export function useProductGroup() {
    const reset = () => {
        state.firstLoad.value = false
    }

    return {
        columns,
        pagination,
        state,

        reset
    }
}