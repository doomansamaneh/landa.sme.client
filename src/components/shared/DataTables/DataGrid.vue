<template>
  <div :class="containerClass">
    <div class="q-table__middle scroll">
      <table class="q-table">
        <thead>
          <tr>
            <th
              v-if="numbered"
              style="width: 1px;"
            >#</th>
            <th
              v-if="multiSelect"
              style="width: 1px;"
            >
              <q-checkbox
                v-model="checkAll"
                @update:model-value="selectAll"
              />
            </th>
            <th
              v-for="col in gridColumns"
              :key="col.name"
              :style="col.style"
              :class="headerClass(col)"
              @click="sortColumn(col)"
            >
              <span class="q-icon q-table__sort-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"></path>
                </svg>
              </span>
              <span>{{ col.label }}</span>
            </th>
            <th
              v-if="expandable"
              style="width: 1px;"
            ></th>
          </tr>
          <tr class="row-filter">
            <th
              v-if="numbered"
              class="filter"
            ></th>
            <th v-if="multiSelect"> </th>
            <th
              v-for="col in gridColumns"
              :key="col.name"
              class="filter"
            >
              <slot
                v-if="col.showFilter"
                :name="`filter_${col.name}`"
                :col="col"
              >
                <q-input
                  outlined
                  dense
                  clearable
                  v-model="col.value"
                  debounce="500"
                  @update:model-value="reloadData"
                />
                <!--
                  @change="reloadData"
                  debounce="500"
                  @update:model-value="reloadData"
                -->
              </slot>
            </th>
            <th
              v-if="expandable"
              class="filter"
            ></th>
          </tr>
          <tr
            v-if="showLoader"
            class="q-table__progress"
          >
            <th
              colspan="100%"
              class="relative-position"
            >
              <q-linear-progress
                indeterminate
                rounded
                color="negative"
                class="q-mt-sm"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(row, index) in gridRows"
            :key="row.id"
          >
            <tr
              @click="setActiveRow(row)"
              :class="getRowClass(row)"
            >
              <td v-if="numbered"><small class="text-grey_">{{ rowIndex(index) }}</small></td>
              <td v-if="multiSelect">
                <q-checkbox
                  v-model="row.selected"
                  @update:model-value="selectRow(row, $event)"
                />
              </td>
              <td
                v-for="col in gridColumns"
                :key="col.name"
                :class="col.cellClass"
                :style="col.cellStyle"
              >
                <slot
                  :name="`cell_${col.field}`"
                  :item="row"
                >
                  {{ row[col.field] }}
                </slot>
              </td>
              <td
                v-if="expandable"
                style="width: 1px;"
              >
                <q-btn
                  size="md"
                  color="primary"
                  class="expand-icon"
                  flat
                  dense
                  round
                  @click="toggleExpand(row)"
                  :icon="row.expanded ? 'expand_less' : 'chevron_left'"
                />
              </td>
            </tr>
            <tr
              class="expand"
              v-if="row.expanded"
            >
              <td colspan="100%">
                <slot
                  name="detail"
                  :item="row"
                > </slot>
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot class="table-total">
          <tr
            v-if="selectedRows.length > 1"
            class="grid-subtotal bg-grey-3 text-black"
          >
            <!-- //todo: css class and remove bg-grey -->
            <slot
              name="footer-subtotal"
              :selectedRows="selectedRows"
            >
            </slot>
          </tr>
          <tr
            v-if="summary != null"
            class="grid-total bg-blue text-white"
          >
            <!-- //todo: css class and remove bg-blue -->
            <slot
              name="footer-total"
              :summary="summary"
            >
            </slot>
          </tr>
        </tfoot>
      </table>
    </div>
    <div
      v-if="!loading && gridRows.length == 0"
      class="q-table__bottom items-center q-table__bottom--nodata"
    >
      <slot name="noDataFound">
        <no-data-found />
      </slot>
    </div>
    <div
      v-if="showPagebar"
      class="q-table__bottom"
    >
      <page-bar
        class="page-bar_"
        :pagination="gridPagination"
        @page-changed="loadData"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue"
import { useQuasar } from 'quasar'
import { fetchWrapper } from "src/helpers"
import { sqlOperator } from "src/constants"
import PageBar from "./PageBar.vue"
import NoDataFound from "./NoDataFound.vue"

const props = defineProps({
  sortBy: String,
  columns: Array,
  dataSource: String,
  expandable: Boolean,
  numbered: Boolean,
  multiSelect: Boolean,
  separator: String,
  square: Boolean,
  bordered: Boolean,
  flat: Boolean,
  dense: Boolean,
  grid: Boolean,
  wrapCells: Boolean,
  gridStore: Object
})

const emit = defineEmits(['active-row-changed', 'selected-rows-changed'])

const $q = useQuasar()
const rows = ref([])
const allSelectedIds = ref([])
const summary = ref(null)
const loading = ref(false)
const showLoader = ref(false)
const activeRow = ref(null)
const loaderTimeout = 500
const defaultPageSize = 5

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: props.sortBy,
  sortOrder: 1,
  totalItems: 0,
  searchTerm: "",
  filterExpression: []
})

onMounted(() => {
  if (!props.gridStore?.firstLoad.value) {
    props.gridStore?.setLoaded()
    reloadData()
  }
  //todo: how to capture event raised by advanced search proxy
  //if not possible then remove advancedSearch property
  //props.advancedSearch?.addEventListener('apply-search', applySearch)
})

function applySearch() {
  alert('search applied')
}

function setPayload() {
  gridPagination.value.filterExpression = []
  let columns = ""
  gridColumns.value.forEach((item) => {
    if (columns === "") columns = item.name
    else columns = `${columns},${item.name}`
    if (item.value) {
      gridPagination.value.filterExpression.push({
        fieldName: item.name,
        operator: item.operator ?? sqlOperator.like,
        value: item.value
      })
    }
  })
  gridPagination.value.columns = columns
  gridPagination.value.searchModel = JSON.stringify(props.gridStore?.searchModel.value)
  //console.log(props.advancedSearch)
  //gridPagination.value.searchModel = JSON.stringify(searchModel.value)
}

async function sortColumn(col) {
  if (col.sortable) {
    if (gridPagination.value.sortColumn === col.name) {
      if (gridPagination.value.sortOrder === 1) gridPagination.value.sortOrder = 2
      else gridPagination.value.sortOrder = 1
    } else {
      gridPagination.value.sortColumn = col.name
      gridPagination.value.sortOrder = 1
    }
    await reloadData()
  }
}

async function reloadData() {
  await loadData()
}

async function loadData() {
  loading.value = true

  let loadingTimer = setTimeout(() => {
    if (loading.value) showLoader.value = true
  }, loaderTimeout)

  setPayload()

  await fetchWrapper
    .post(props.dataSource, gridPagination.value)
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
  gridRows.value = pagedData.items
  summary.value = pagedData.summaryData
  gridRows.value.forEach((row) => {
    row.selected = (allSelectedIds.value.indexOf(row.id) > -1)
  })
  gridPagination.value.totalItems = pagedData.page.totalItems
  //paginationStore.setCurrentPage(gridPagination.value.currentPage)
}

function rowIndex(index) {
  return (gridPagination.value.currentPage - 1) * gridPagination.value.pageSize + index + 1
}

function selectAll(checked) {
  gridRows.value.forEach((row) => {
    row.selected = checked
    updatedSelectedIds(row, checked)
  })
  emitselectedRows()
}

function selectRow(row, checked) {
  updatedSelectedIds(row, checked)
  emitselectedRows()
}

function updatedSelectedIds(row, checked) {
  const index = allSelectedIds.value.indexOf(row.id)
  if (checked) {
    if (index < 0) allSelectedIds.value.push(row.id)
  }
  else {
    if (index >= 0) allSelectedIds.value.splice(index, 1)
  }
}

function emitselectedRows() {
  emit('selected-rows-changed', selectedRows.value)
}

function setActiveRow(row) {
  activeRow.value = row
  emit("active-row-changed", row)
}

function getRowClass(row) {
  return (row.id === activeRow.value?.id ? "row-active" : "")
    + (row.selected === true ? " selected" : "")
}

function toggleExpand(row) {
  row.expanded = !row.expanded
  gridRows.value.forEach((item) => {
    if (row.id != item.id) item.expanded = false
  })
}

const checkAll = computed(() => {
  if (selectedRows.value?.length == 0) return false
  if (selectedRows.value.length === gridRows.value.length) return true
  return ""
})

const showPagebar = computed(() => gridPagination.value.totalItems > defaultPageSize)
const selectedRows = computed(() => gridRows.value.filter(row => row.selected === true))

const gridColumns = computed(() => {
  if (props.gridStore != null) return props.gridStore.columns.value
  return props.columns
})

const gridPagination = computed(() => {
  if (props.gridStore != null) return props.gridStore.pagination.value
  return pagination.value
})

const gridRows = computed({
  get() {
    if (props.gridStore != null) return props.gridStore.rows.value
    return rows.value
  },
  set(value) {
    if (props.gridStore != null) return props.gridStore.setRows(value)
    return rows.value = value
  }
})

function headerClass(col) {
  return `${col.class}`
    + (col.sortable === true ? " sortable" : '')
    + (col.sortable && col.name === gridPagination.value.sortColumn ? " sorted" : "")
    + (col.sortable && col.name === gridPagination.value.sortColumn ? (gridPagination.value.sortOrder === 1 ? "" : " sort-desc") : "")
}

const cardDefaultClass = computed(() =>
  ' q-table__card'
  + ($q.dark.isActive === true ? ' q-table__card--dark q-dark' : '')
  + (props.square === true ? ' q-table--square' : '')
  + (props.flat === true ? ' q-table--flat' : '')
  + (props.bordered === true ? ' q-table--bordered' : '')
)

const __containerClass = computed(() =>
  `q-table__container q-table--${props.separator}-separator column no-wrap q-pt-md`
  + (props.grid === true ? ' q-table--grid' : cardDefaultClass.value)
  + ($q.dark?.isActive === true ? ' q-table--dark' : '')
  + (props.dense === true ? ' q-table--dense' : '')
  + (props.wrapCells === false ? ' q-table--no-wrap' : '')
  //+ (inFullscreen.value === true ? ' fullscreen scroll' : '')
)

const containerClass = computed(() =>
  __containerClass.value
  + (loading.value === true ? ' q-table--loading' : '')
)

defineExpose({
  reloadData,
  activeRow,
  selectedRows,
  allSelectedIds,
  rows,
})
</script>

<style lang="scss"></style>
