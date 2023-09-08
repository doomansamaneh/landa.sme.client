import { computed, ref } from "vue"
import { sqlOperator } from "src/constants/enums"
import { fetchWrapper } from "src/helpers"

export function useDataTable(dataSource
    , columns
    , store) {

    if (store?.columns != null) columns = store.columns.value
    const defaultPageSize = store?.defaultPageSize ?? 5
    const loaderTimeout = 500

    const loading = ref(false)
    const showLoader = ref(false)

    const _rows = ref([])
    const _allSelectedIds = ref([])
    const _summaryData = ref(null)
    const _activeRow = ref(null)

    const _pagination = ref({
        currentPage: 1,
        pageSize: defaultPageSize,
        sortColumn: "",
        sortOrder: 1,
        totalItems: 0,
        filterExpression: []
    })

    const rows = computed({
        get() {
            if (store != null) return store.rows.value
            return _rows.value
        },
        set(value) {
            if (store != null) store.rows.value = value
            else _rows.value = value
        }
    })

    const activeRow = computed({
        get() {
            if (store != null) return store.activeRow.value
            return _activeRow.value
        },
        set(value) {
            if (store != null) store.activeRow.value = value
            else _activeRow.value = value
        }
    })

    const summaryData = computed({
        get() {
            if (store != null) return store.summaryData.value
            return _summaryData.value
        },
        set(value) {
            if (store != null) store.summaryData.value = value
            else _summaryData.value = value
        }
    })

    const pagination = computed(() => {
        if (store != null) return store.pagination.value
        return _pagination.value
    })

    const allSelectedIds = computed(() => {
        if (store != null) return store.allSelectedIds.value
        return _allSelectedIds.value
    })

    const showPagebar = computed(() =>
        pagination.value.totalItems > defaultPageSize
    )

    const selectedRows = computed(() =>
        rows.value.filter((row) => row.selected === true)
    )

    const checkedAll = computed(() => {
        if (selectedRows.value?.length == 0) return false
        if (selectedRows.value.length === rows.value.length) return true
        return ""
    })

    // const checkedAll = computed({
    //     ge() {
    //         if (selectedRows.value?.length == 0) return false
    //         if (selectedRows.value.length === rows.value.length) return true
    //         return ""
    //     },
    //     set(value) {
    //         rows.value.forEach((row) => {
    //             row.selected = value
    //             updatedSelectedIds(row, value)
    //         })
    //     }
    // })

    function rowIndex(index) {
        return (
            (pagination.value.currentPage - 1) * pagination.value.pageSize +
            index +
            1
        )
    }

    async function loadData() {
        loading.value = true

        let loadingTimer = setTimeout(() => {
            if (loading.value) showLoader.value = true
        }, loaderTimeout)

        setPayload()

        await fetchWrapper
            .post(dataSource, pagination.value)
            .then((response) => {
                handleResponse(response.data.data)
            })
            .finally(() => {
                clearTimeout(loadingTimer)
                loading.value = false
                showLoader.value = false
            })
    }

    function handleResponse(pagedData) {
        const items = pagedData.items
        items.forEach((item) => {
            item.selected = allSelectedIds.value.indexOf(item.id) > -1
        })
        rows.value = items
        summaryData.value = pagedData.summaryData
        pagination.value.totalItems = pagedData.page.totalItems
    }

    function setActiveRow(row) {
        activeRow.value = row
    }

    function selectAll(checked) {
        rows.value.forEach((row) => {
            row.selected = checked
            updatedSelectedIds(row, checked)
        })
    }

    function selectRow(row, checked) {
        updatedSelectedIds(row, checked)
    }

    function updatedSelectedIds(row, checked) {
        const index = allSelectedIds.value.indexOf(row.id)
        if (checked) {
            if (index < 0) allSelectedIds.value.push(row.id)
        } else {
            if (index >= 0) allSelectedIds.value.splice(index, 1)
        }
    }

    function setPayload() {
        pagination.value.filterExpression = []
        let payLoadCols = ""
        columns?.forEach((item) => {
            if (payLoadCols === "") payLoadCols = item.name
            else payLoadCols = `${payLoadCols},${item.name}`
            if (item.value) {
                pagination.value.filterExpression.push({
                    fieldName: item.name,
                    operator: item.operator ?? sqlOperator.like,
                    value: item.value
                })
            }
        })
        pagination.value.columns = payLoadCols
        if (store?.searchModel != null)
            pagination.value.searchModel = JSON.stringify(store.searchModel.value)
    }

    async function sortColumn(col) {
        if (col.sortable) {
            if (pagination.value.sortColumn === col.name) {
                if (pagination.value.sortOrder === 1)
                    pagination.value.sortOrder = 2
                else pagination.value.sortOrder = 1
            } else {
                pagination.value.sortColumn = col.name
                pagination.value.sortOrder = 1
            }
            await loadData()
        }
    }

    function toggleExpand(row) {
        row.expanded = !row.expanded
        rows.value.forEach((item) => {
            if (row.id != item.id) item.expanded = false
        })
    }

    function getSortableClass(col) {
        return (
            `${col.class}` +
            (col.sortable === true ? " sortable" : "") +
            (col.sortable && col.name === pagination.value.sortColumn
                ? " sorted"
                : "") +
            (col.sortable && col.name === pagination.value.sortColumn
                ? pagination.value.sortOrder === 1
                    ? ""
                    : " sort-desc"
                : "")
        )
    }

    function getRowClass(row) {
        return (row.id === activeRow.value?.id ? "row-active" : "") +
            (row.selected === true ? " selected" : "")
    }

    return {
        allSelectedIds,
        rows,
        showPagebar,
        selectedRows,
        rowIndex,
        activeRow,
        pagination,
        checkedAll,
        summaryData,

        selectAll,
        setActiveRow,
        updatedSelectedIds,
        loadData,
        selectRow,
        sortColumn,
        toggleExpand,
        getSortableClass,
        getRowClass
    }
}