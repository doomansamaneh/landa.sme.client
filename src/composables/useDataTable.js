import { computed, ref } from "vue"
import { sqlOperator } from "src/constants/enums"
import { fetchWrapper } from "src/helpers"

export function useDataTable(dataSource
  , dataColumns
  , store) {

  const defaultPageSize = store?.defaultPageSize ?? 5

  const _state = {
    firstLoad: ref(false),
    rows: ref([]),
    searchField: ref(""),
    allSelectedIds: ref([]),
    activeRow: ref(null),
    summaryData: ref(null),
    searchModel: ref(null)
  }

  const _pagination = ref({
    currentPage: 1,
    pageSize: defaultPageSize,
    sortOrder: 1,
    sortColumn: "",
    totalItems: 0,
    searchTerm: "",
    filterExpression: []
  })

  const columns = computed(() => store?.columns.value ?? dataColumns)
  const state = computed(() => store?.state ?? _state)
  const pagination = computed(() => store?.pagination.value ?? _pagination.value)

  const loaderTimeout = 500

  const loading = ref(false)
  const showLoader = ref(false)


  const showPagebar = computed(() =>
    pagination.value.totalItems > defaultPageSize
  )

  const selectedRows = computed(() =>
    state.value.rows.value.filter((row) => row.selected === true)
  )

  const checkedAll = computed(() => {
    if (selectedRows.value?.length == 0) return false
    if (selectedRows.value.length === state.value.rows.value.length) return true
    return ""
  })

  function rowIndex(index) {
    return (
      (pagination.value.currentPage - 1) * pagination.value.pageSize +
      index +
      1
    )
  }

  async function loadData() {
    if (!state.value.firstLoad.value) {
      state.value.firstLoad.value = true
      await reloadData()
    }
  }

  async function reloadData() {
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
      item.selected = state.value.allSelectedIds.value.indexOf(item.id) > -1
    })
    state.value.rows.value = items
    state.value.summaryData.value = pagedData.summaryData
    pagination.value.totalItems = pagedData.page.totalItems
    pagination.value.currentPage = pagedData.page.currentPage
  }

  function setActiveRow(row) {
    state.value.activeRow.value = row
  }

  function selectAll(checked) {
    state.value.rows.value.forEach((row) => {
      row.selected = checked
      updatedSelectedIds(row, checked)
    })
  }

  function selectRow(row, checked) {
    updatedSelectedIds(row, checked)
  }

  function updatedSelectedIds(row, checked) {
    const index = state.value.allSelectedIds.value.indexOf(row.id)
    if (checked) {
      if (index < 0) state.value.allSelectedIds.value.push(row.id)
    } else {
      if (index >= 0) state.value.allSelectedIds.value.splice(index, 1)
    }
  }

  function setPayload() {
    pagination.value.filterExpression = []
    if (columns.value) {
      let payLoadCols = ""
      columns.value.forEach((col) => {
        if (payLoadCols === "") payLoadCols = col.name
        else payLoadCols = `${payLoadCols},${col.name}`
        if (col.value) {
          pagination.value.filterExpression.push({
            fieldName: col.name,
            operator: col.operator ?? sqlOperator.like,
            value: col.value
          })
        }
      })

      if (pagination.value.searchField && pagination.value.searchTerm) {
        pagination.value.filterExpression.push({
          fieldName: pagination.value.searchField,
          operator: sqlOperator.like,
          value: pagination.value.searchTerm
        })
      }

      pagination.value.columns = payLoadCols
    }
    else console.warn("[landa]: columns are not defined")
    if (state.value.searchModel != null)
      pagination.value.searchModel = JSON.stringify(state.value.searchModel.value)
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
      await reloadData()
    }
  }

  function toggleExpand(row) {
    row.expanded = !row.expanded
    state.value.rows.value.forEach((item) => {
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
    return (row.id === state.value.activeRow.value?.id ? "row-active" : "") +
      (row.selected === true ? " row-selected" : "")
  }

  return {
    allSelectedIds: state.value.allSelectedIds,
    rows: state.value.rows,
    activeRow: state.value.activeRow,
    summaryData: state.value.summaryData,

    loading,
    showLoader,
    selectedRows,
    showPagebar,
    rowIndex,
    pagination,
    checkedAll,

    selectAll,
    setActiveRow,
    updatedSelectedIds,
    loadData,
    reloadData,
    selectRow,
    sortColumn,
    toggleExpand,
    getSortableClass,
    getRowClass
  }
}


