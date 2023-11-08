import { computed, ref } from "vue"
import { defaultPageSize, sqlOperator } from "src/constants/enums"
import { fetchWrapper, helper } from "src/helpers"

export function useDataTable(dataSource
  , dataColumns
  , store) {

  const localState = {
    firstLoad: ref(false),
    rows: ref([]),
    searchField: ref(""),
    allSelectedIds: ref([]),
    activeRow: ref(null),
    summaryData: ref(null),
    searchModel: ref(null)
  }

  const localPagination = ref({
    currentPage: 1,
    pageSize: defaultPageSize,
    sortOrder: 1,
    sortColumn: "",
    totalItems: 0,
    searchTerm: "",
    filterExpression: []
  })

  const columns = computed(() => store?.columns?.value ?? dataColumns)
  const state = computed(() => store?.state ?? localState)
  const pagination = computed(() => store?.pagination.value ?? localPagination.value)

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
    if (selectedRows.value?.length === 0) return false
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

  // async function handleDataResponse(pagedData) {
  //   const items = pagedData.items;
  //   let clearActiveRow = true;
  //   items.forEach((item) => {
  //     item.selected = state.value.allSelectedIds.value.includes(item.id);
  //     if (clearActiveRow) clearActiveRow = state.value.activeRow.value?.id != item.id;
  //   });
  //   if (clearActiveRow) setActiveRow(null);
  //   state.value.rows.value = items;
  //   state.value.summaryData.value = pagedData.summaryData;
  //   pagination.value.totalItems = pagedData.page.totalItems;
  //   pagination.value.currentPage = pagedData.page.currentPage;
  // }

  async function reloadData() {
    await fetchData(pagination.value, handleDataResponse)

    function handleDataResponse(pagedData) {
      const items = pagedData.items
      let clearActiveRow = true
      items.forEach((item) => {
        item.selected = state.value.allSelectedIds.value.includes(item.id)
        if (clearActiveRow) clearActiveRow = state.value.activeRow.value?.id != item.id
      })
      if (clearActiveRow) setActiveRow(null)
      state.value.rows.value = items
      state.value.summaryData.value = pagedData.summaryData
      pagination.value.totalItems = pagedData.page.totalItems
      pagination.value.currentPage = pagedData.page.currentPage
    }
  }

  async function fetchData(gridPage, handleResponse) {
    loading.value = true

    let loadingTimer = setTimeout(() => {
      if (loading.value) showLoader.value = true
    }, loaderTimeout)

    setPayload()

    await fetchWrapper
      .post(dataSource, gridPage)
      .then((response) => {
        handleResponse(response.data.data)
      })
      .finally(() => {
        clearTimeout(loadingTimer)
        loading.value = false
        showLoader.value = false
      })
  }

  function setPayload() {
    pagination.value.filterExpression = []
    if (store?.filterExpression != null) pagination.value.filterExpression = [...store.filterExpression]

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
    //else console.warn("[landa]: columns are not defined")

    if (state.value.searchModel != null)
      pagination.value.searchModel = JSON.stringify(state.value.searchModel.value)
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

  function exportCurrentPage() {
    helper.exportCsv(state.value.rows.value, columns.value)
  }

  async function exportAll() {
    const allPage = { ...pagination.value }
    allPage.pageSize = -1
    await fetchData(allPage, handleResponse)

    function handleResponse(pagedData) {
      helper.exportCsv(pagedData.items, columns.value)
    }
  }

  return {
    allSelectedIds: state.value.allSelectedIds,
    rows: state.value.rows,
    activeRow: state.value.activeRow,
    summaryData: state.value.summaryData,

    loading,
    showLoader,
    selectedRows,
    columns,
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
    getRowClass,
    exportCurrentPage,
    exportAll
  }
}