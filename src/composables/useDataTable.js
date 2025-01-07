import { computed, ref, onMounted, onUnmounted } from "vue";
import {
  defaultPageSize,
  dataViewDefaultPageSize,
  sqlOperator,
  guidEmpty,
} from "src/constants/enums";

import { fetchWrapper, helper, bus } from "src/helpers";

const inFullscreen = ref(false);
const separator = ref("horizontal");
const dense = ref(true);
const thFontSize = ref(12);
const tdFontSize = ref(13);

export function useDataTable({
  dataSource,
  dataColumns,
  store,
  beforeLoadData,
  handleGridDataResponse,
}) {
  const _dataSource = ref(dataSource);
  const _state = {
    firstLoad: ref(false),
    rows: ref([]),
    searchField: ref(""),
    allSelectedIds: ref([]),
    activeRow: ref(null),
    summaryData: ref(null),
    searchModel: ref(null),
  };

  const _pagination = ref({
    currentPage: 1,
    pageSize: defaultPageSize,
    sortOrder: 1,
    sortColumn: "",
    totalItems: 0,
    searchTerm: "",
    filterExpression: [],
  });

  const columns = computed(
    () => store?.columns?.value ?? dataColumns
  );
  const state = computed(() => store?.state ?? _state);
  const pagination = computed(
    () => store?.pagination?.value ?? _pagination.value
  );

  // const loading = ref(false)
  const showLoader = ref(false);
  const inputInnerLoader = ref(false);

  const showPagebar = computed(
    () => pagination.value.totalItems > defaultPageSize
  );

  const dataViewShowPagebar = computed(
    () => pagination.value.totalItems > dataViewDefaultPageSize
  );

  const selectedRows = computed(() =>
    state.value.rows.value.filter((row) => row.selected === true)
  );

  const checkedAll = computed(() => {
    if (selectedRows.value?.length === 0) return false;
    if (selectedRows.value.length === state.value.rows.value.length)
      return true;
    return "";
  });

  const toggleFullscreen = () => {
    inFullscreen.value = !inFullscreen.value;
  };

  const toggleDense = () => {
    dense.value = !dense.value;
  };

  const toggleFontSize = () => {
    thFontSize.value = thFontSize.value === 12 ? 13 : 12;
    tdFontSize.value = tdFontSize.value === 13 ? 14 : 13;
  };

  const toggleSeparator = () => {
    separator.value =
      separator.value === "horizontal" ? "none" : "horizontal";
  };

  function rowIndex(index) {
    return (
      (pagination.value.currentPage - 1) * pagination.value.pageSize +
      index +
      1
    );
  }

  async function loadData() {
    if (beforeLoadData) beforeLoadData();
    if (!state.value.firstLoad.value) {
      state.value.firstLoad.value = true;
      await reloadData();
      return true;
    }
    return false;
  }

  async function applySearch() {
    if (!state?.value?.disableApplySearch) await reloadData();
  }

  async function renderPage() {
    if (!state?.value?.disableApplySearch) await loadData();
  }

  async function reloadData() {
    if (!_dataSource.value) {
      console.error("Landa: data table data source is not defined");
      return;
    }
    await fetchData(pagination.value, handleDataResponse);

    function handleDataResponse(pagedData) {
      const items = pagedData.items;
      let clearActiveRow = true;
      items.forEach((item) => {
        item.selected = state.value.allSelectedIds.value.includes(
          item.id
        );
        if (clearActiveRow)
          clearActiveRow = state.value.activeRow.value?.id != item.id;
      });
      if (clearActiveRow) setActiveRow(null);
      state.value.rows.value = items;
      state.value.isAuthorizeToCreate = pagedData.isAuthorizeToCreate;
      pagination.value.totalItems = pagedData.page.totalItems;
      pagination.value.totalPages = pagedData.page.totalPages;
      pagination.value.currentPage = pagedData.page.currentPage;
      if (state.value.summaryData != undefined)
        state.value.summaryData.value = pagedData.summaryData;
    }

    if (handleGridDataResponse) handleGridDataResponse();
  }

  async function fetchData(gridPage, handleResponse) {
    showLoader.value = true;
    inputInnerLoader.value = true;

    try {
      setPayload();

      const response = await fetchWrapper.post(
        _dataSource.value,
        gridPage,
        true
      );
      handleResponse(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      showLoader.value = false;
      inputInnerLoader.value = false;
    }
  }

  function setFilterExpression(filters) {
    if (state?.value) state.value.filterExpression = filters;
  }

  function setPayload() {
    pagination.value.filterExpression = [];
    if (store?.filterExpression)
      pagination.value.filterExpression.push(
        ...store.filterExpression
      );

    if (state?.value.filterExpression)
      pagination.value.filterExpression.push(
        ...state.value.filterExpression
      );

    if (columns.value) {
      let payLoadCols = "";
      columns.value.forEach((col) => {
        if (col.field) {
          if (payLoadCols === "") payLoadCols = col.field;
          else payLoadCols = `${payLoadCols},${col.field}`;
          if (col.value) {
            pagination.value.filterExpression.push({
              fieldName: col.field,
              operator: col.operator ?? sqlOperator.like,
              value: col.value,
            });
          }
        }
      });

      if (
        pagination.value.searchField &&
        pagination.value.searchTerm
      ) {
        pagination.value.filterExpression.push({
          fieldName: pagination.value.searchField,
          operator: sqlOperator.like,
          value: pagination.value.searchTerm,
        });
      }

      pagination.value.columns = payLoadCols;
    }
    //else console.warn("[landa]: columns are not defined")

    if (state.value.searchModel != null)
      pagination.value.searchModel = JSON.stringify(
        state.value.searchModel.value
      );
  }

  function setActiveRow(row) {
    state.value.activeRow.value = row;
  }

  function selectAll(checked) {
    state.value.rows.value.forEach((row) => {
      row.selected = checked;
      updatedSelectedIds(row, checked);
    });
  }

  function selectRow(row, checked) {
    row.selected = checked;
    updatedSelectedIds(row, checked);
  }

  function selectRowById(id, checked) {
    const row = state.value.rows.value.find((item) => item.id === id);
    if (row) {
      row.selected = checked;
      updatedSelectedIds(row, checked);
    }
  }

  function updatedSelectedIds(row, checked) {
    const index = state.value.allSelectedIds.value.indexOf(row.id);
    if (checked) {
      if (index < 0) state.value.allSelectedIds.value.push(row.id);
    } else {
      if (index >= 0)
        state.value.allSelectedIds.value.splice(index, 1);
    }
  }

  async function sortColumn(col) {
    if (col.sortable) {
      if (pagination.value.sortColumn === col.name) {
        if (pagination.value.sortOrder === 1)
          pagination.value.sortOrder = 2;
        else pagination.value.sortOrder = 1;
      } else {
        pagination.value.sortColumn = col.name;
        pagination.value.sortOrder = 1;
      }
      await reloadData();
    }
  }

  function toggleExpand(row) {
    row.expanded = !row.expanded;
    state.value.rows.value.forEach((item) => {
      if (row.id != item.id) item.expanded = false;
    });
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
    );
  }

  function getRowClass(row) {
    return (
      (row.id === state.value.activeRow.value?.id
        ? "row-active"
        : "") + (row.selected === true ? " row-selected" : "")
    );
  }

  function exportCurrentPage() {
    helper.exportCsv(state.value.rows.value, columns.value);
  }

  async function exportAll() {
    const allPage = { ...pagination.value };
    allPage.pageSize = -1;
    await fetchData(allPage, handleResponse);

    function handleResponse(pagedData) {
      helper.exportCsv(pagedData.items, columns.value);
    }
  }

  function setSearchTerm(term) {
    pagination.value.searchTerm = term;
  }

  function setDataSource(dataSource) {
    _dataSource.value = dataSource;
  }

  function clearState() {
    state.value.rows.value = [];
    pagination.value.totalItems = 0;
    pagination.value.totalPages = 0;
    pagination.value.currentPage = 1;
    state.value.allSelectedIds.value = [];
    state.value.activeRow.value = null;
    state.value.summaryData.value = null;
  }

  onMounted(() => {
    bus.on("render-page", renderPage);
    bus.on("apply-search", applySearch);
  });

  onUnmounted(() => {
    bus.off("render-page", renderPage);
    bus.off("apply-search", applySearch);
  });

  return {
    allSelectedIds: state.value.allSelectedIds,
    rows: state.value.rows,
    activeRow: state.value.activeRow,
    summaryData: state.value.summaryData,

    //loading,
    store,
    state,
    inputInnerLoader,
    showLoader,
    selectedRows,
    columns,
    showPagebar,
    dataViewShowPagebar,
    rowIndex,
    pagination,
    checkedAll,
    clearState,
    setDataSource,

    inFullscreen,
    separator,
    dense,
    thFontSize,
    tdFontSize,
    toggleFullscreen,
    toggleDense,
    toggleFontSize,
    toggleSeparator,

    selectAll,
    setFilterExpression,
    setActiveRow,
    updatedSelectedIds,
    loadData,
    reloadData,
    selectRow,
    selectRowById,
    setSearchTerm,
    sortColumn,
    toggleExpand,
    getSortableClass,
    getRowClass,
    exportCurrentPage,
    exportAll,
  };
}
