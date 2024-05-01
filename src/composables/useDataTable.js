import { computed, ref, onMounted, onUnmounted } from "vue";
import {
  defaultPageSize,
  dataViewDefaultPageSize,
  sqlOperator,
} from "src/constants/enums";
import { fetchWrapper, helper, bus } from "src/helpers";

const openInPage = ref(false)

export function useDataTable(dataSource, dataColumns, store) {

  const localState = {
    firstLoad: ref(false),
    rows: ref([]),
    searchField: ref(""),
    allSelectedIds: ref([]),
    activeRow: ref(null),
    summaryData: ref(null),
    searchModel: ref(null),
  };

  const localPagination = ref({
    currentPage: 1,
    pageSize: defaultPageSize,
    sortOrder: 1,
    sortColumn: "",
    totalItems: 0,
    searchTerm: "",
    filterExpression: [],
  });

  const columns = computed(() => store?.columns?.value ?? dataColumns);
  const state = computed(() => store?.state ?? localState);
  const pagination = computed(
    () => store?.pagination.value ?? localPagination.value
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

  function rowIndex(index) {
    return (
      (pagination.value.currentPage - 1) * pagination.value.pageSize + index + 1
    );
  }

  async function loadData() {
    //alert("load data");
    if (!state.value.firstLoad.value) {
      state.value.firstLoad.value = true;
      await reloadData();
      return true;
    }
    return false;
  }

  async function reloadData() {
    //alert("reload data");
    await fetchData(pagination.value, handleDataResponse);

    function handleDataResponse(pagedData) {
      const items = pagedData.items;
      let clearActiveRow = true;
      items.forEach((item) => {
        item.selected = state.value.allSelectedIds.value.includes(item.id);
        if (clearActiveRow)
          clearActiveRow = state.value.activeRow.value?.id != item.id;
      });
      if (clearActiveRow) setActiveRow(null);
      state.value.rows.value = items;
      pagination.value.totalItems = pagedData.page.totalItems;
      pagination.value.totalPages = pagedData.page.totalPages;
      pagination.value.currentPage = pagedData.page.currentPage;
      if (state.value.summaryData != undefined)
        state.value.summaryData.value = pagedData.summaryData;
    }
  }

  async function fetchData(gridPage, handleResponse) {
    showLoader.value = true;
    inputInnerLoader.value = true;

    try {
      setPayload();

      const response = await fetchWrapper.post(dataSource, gridPage, true);
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
    if (store?.filterExpression != null) {
      pagination.value.filterExpression.push(...store.filterExpression);
    }
    if (state?.value.filterExpression != null)
      pagination.value.filterExpression.push(...state.value.filterExpression);

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

      if (pagination.value.searchField && pagination.value.searchTerm) {
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

  function updatedSelectedIds(row, checked) {
    const index = state.value.allSelectedIds.value.indexOf(row.id);
    if (checked) {
      if (index < 0) state.value.allSelectedIds.value.push(row.id);
    } else {
      if (index >= 0) state.value.allSelectedIds.value.splice(index, 1);
    }
  }

  async function sortColumn(col) {
    if (col.sortable) {
      if (pagination.value.sortColumn === col.name) {
        if (pagination.value.sortOrder === 1) pagination.value.sortOrder = 2;
        else pagination.value.sortOrder = 1;
      } else {
        pagination.value.sortColumn = col.name;
        pagination.value.sortOrder = 1;
      }
      await reloadData();
    }
  }

  function toggleExpand(row) {

    openInPage.value = true

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
      (row.id === state.value.activeRow.value?.id ? "row-active" : "") +
      (row.selected === true ? " row-selected" : "")
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

  onMounted(() => {
    bus.on("render-page", loadData);
  });

  onUnmounted(() => {
    bus.off("render-page", loadData);
  });

  return {
    allSelectedIds: state.value.allSelectedIds,
    rows: state.value.rows,
    activeRow: state.value.activeRow,
    summaryData: state.value.summaryData,

    //loading,
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
    openInPage,

    selectAll,
    setFilterExpression,
    setActiveRow,
    updatedSelectedIds,
    loadData,
    reloadData,
    selectRow,
    setSearchTerm,
    sortColumn,
    toggleExpand,
    getSortableClass,
    getRowClass,
    exportCurrentPage,
    exportAll,
  };
}
