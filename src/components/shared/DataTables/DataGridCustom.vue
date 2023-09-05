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
                v-model="selectedAll"
                @update:model-value="selectAll"
              />
            </th>
            <th
              v-for="col in columns"
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
              v-for="col in columns"
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
            v-for="(row, index) in rows"
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
                  @update:model-value="selectRow(row)"
                />
              </td>
              <td
                v-for="col in columns"
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
        <tbody v-if="!loading && rows.length == 0">
          <tr>
            <td colspan="100%">
              <slot name="noDataFound">
                //todo: ui/ux
                هیچ داده ای پیدا نشد
              </slot>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <slot
            name="footer-subtotal"
            :selection="selection"
          >
          </slot>
          <slot
            name="footer-total"
            :summary="summary"
          >
          </slot>
        </tfoot>
      </table>
    </div>
    <div
      v-if="showPagebar"
      class="q-table__bottom"
    >
      <page-bar
        class="page-bar_"
        :pagination="pagination"
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
  advancedSearch: Object
})

const emit = defineEmits(['active-row-changed', 'selection-changed'])

const $q = useQuasar()
const rows = ref([])
const summary = ref(null)
const loading = ref(false)
const showLoader = ref(false)
const activeRow = ref(null)
const loaderTimeout = 500
const defaultPageSize = 5

const pagination = ref({
  currentPage: 1,
  //paginationStore.currentPage,
  pageSize: defaultPageSize,
  sortColumn: props.sortBy,
  sortOrder: 1,
  totalItems: 0,
  searchTerm: "",
  filterExpression: []
})

onMounted(() => {
  reloadData()
  //todo: how to capture event raised by advanced search proxy
  //if not possible then remove advancedSearch property
  //props.advancedSearch?.addEventListener('apply-search', applySearch)
})

function applySearch() {
  alert('search applied')
}

function setPayload() {
  pagination.value.filterExpression = []
  let columns = ""
  props.columns.forEach((item) => {
    if (columns === "") columns = item.name
    else columns = `${columns},${item.name}`
    if (item.value) {
      pagination.value.filterExpression.push({
        fieldName: item.name,
        operator: item.operator ?? sqlOperator.like,
        value: item.value
      })
    }
  })
  pagination.value.columns = columns
  //console.log(props.advancedSearch)
  //pagination.value.searchModel = JSON.stringify(searchModel.value)
}

async function sortColumn(col) {
  if (col.sortable) {
    if (pagination.value.sortColumn === col.name) {
      if (pagination.value.sortOrder === 1) pagination.value.sortOrder = 2
      else pagination.value.sortOrder = 1
    } else {
      pagination.value.sortColumn = col.name
      pagination.value.sortOrder = 1
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
    .post(props.dataSource, pagination.value)
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
  rows.value = pagedData.items
  summary.value = pagedData.summaryData
  rows.value.forEach((row) => {
    row.selected = false
  })
  pagination.value.totalItems = pagedData.page.totalItems
  //paginationStore.setCurrentPage(pagination.value.currentPage)
}

function rowIndex(index) {
  return (pagination.value.currentPage - 1) * pagination.value.pageSize + index + 1
}

function selectAll(checked) {
  rows.value.forEach((row) => row.selected = checked)
  emitSelection()
}

function selectRow(row) {
  emitSelection()
}

function emitSelection() { emit('selection-changed', selection.value) }

function setActiveRow(row) {
  activeRow.value = row
  emit("active-row-changed", row)
}

function setSearchModel(model) {
  pagination.value.searchModel = JSON.stringify(model)
}

function getRowClass(row) {
  return (row.id === activeRow.value?.id ? "row-active" : "")
    + (row.selected === true ? " selected" : "")
}

function toggleExpand(row) {
  row.expanded = !row.expanded
  rows.value.forEach((item) => {
    if (row.id != item.id) item.expanded = false
  })
}

const selectedAll = computed(() => {
  if (selection.value?.length == 0) return false
  if (selection.value.length === rows.value.length) return true
  return ""
})

const showPagebar = computed(() => pagination.value.totalItems > defaultPageSize)
const selection = computed(() => rows.value.filter(row => row.selected === true))

function headerClass(col) {
  return `${col.class}`
    + (col.sortable === true ? " sortable" : '')
    + (col.sortable && col.name === pagination.value.sortColumn ? " sorted" : "")
    + (col.sortable && col.name === pagination.value.sortColumn ? (pagination.value.sortOrder === 1 ? "" : " sort-desc") : "")
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
  setSearchModel,
  activeRow,
  selection,
  rows,
})
</script>

<style lang="scss">
.row-active {
  background-color: #f1f3f4;
}

// .q-table--dense .q-table td {
//   padding: 16px 8px;
// }

// .q-table--dense .q-table .label {
//   padding-bottom: 4px;
// }

// .q-table--dense .q-table .filter {
//   padding-bottom: 16px;
//   border-bottom: 1px solid #2d2d2d2d;
// }

// .q-table--dense 
//   border-bottom: 1px solid #2d2d2d2d
</style>
