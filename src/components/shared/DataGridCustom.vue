<template>
  <q-card class="no-shadow no-border">
    <q-card-section class="q-pa-none">
      <div class="q-table--dense q-table--horizontal-separator">
        <table class="q-table">
          <thead>
            <tr>
              <th
                v-for="col in columns"
                :key="col.name"
                :style="col.style"
                :class="col.class"
                @click="sortColumn(col)"
              >
                <q-icon
                  v-if="showSortIcon(col)"
                  :name="getSortIcon(col)"
                  size="20px"
                  color="primary"
                />
                <span class="cursor-pointer">{{ col.label }}</span>
              </th>
              <th v-if="showExpandIcon"></th>
            </tr>
            <tr>
              <th v-for="col in columns" :key="col.name">
                <q-input
                  outlined
                  v-model="col.value"
                  dense
                  v-if="col.showFilter"
                  @change="reloadData"
                />
              </th>
              <th v-if="showExpandIcon"></th>
            </tr>
          </thead>
          <tbody v-for="row in rows" :key="row.id">
            <tr>
              <td
                v-for="col in columns"
                :key="col.name"
                :class="col.cellClass"
                :style="col.cellStyle"
              >

                <slot :name="`cell_${col.field}`" :item="row">
                  {{ row[col.field] }}
                </slot>
              </td>
              <td v-if="showExpandIcon">
                <q-btn
                  size="md"
                  color="primary"
                  flat
                  dense
                  round
                  @click="toggleExpand(row)"
                  :icon="row.expanded ? 'expand_less' : 'chevron_left'"
                />
              </td>
            </tr>
            <tr class="expand" v-if="row.expanded">
              <td colspan="100%">
                <slot name="detail" :item="row"> </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </q-card-section>
    <page-bar class="page-bar q-mt-xs" :pagination="pagination" @page-changed="loadData" />
  </q-card>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { fetchWrapper } from "src/helpers"
import PageBar from "./PageBar.vue"

const props = defineProps({
  sortBy: String,
  columns: Array,
  dataSource: String,
  expandable: Boolean
})

// const emits = defineEmits(['changeSelected'])

const filter = ref("")
const selected = ref([])
const rows = ref([])
const loading = ref(false)
//const test = ref("");

const pagination = ref({
  currentPage: 1,
  //paginationStore.currentPage,
  pageSize: 5,
  sortColumn: props.sortBy,
  sortOrder: 1,
  totalItems: 0,
  searchTerm: "",
  filterExpression: []
})

onMounted(() => {
  reloadData()
})

function setColumnFilter() {
  pagination.value.filterExpression = []
  props.columns.forEach((item) => {
    if (item.value) {
      pagination.value.filterExpression.push({
        fieldName: item.name,
        operator: 3,
        value: item.value
      })
    }
  })
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
  setColumnFilter()
  await fetchWrapper
    .post(props.dataSource, pagination.value)
    .then((response) => {
      handleResponse(response.data.data)
    })
    .finally(() => {
      loading.value = false
    })
}

function handleResponse(pagedData) {
  rows.value = pagedData.items
  pagination.value.totalItems = pagedData.page.totalItems
  //paginationStore.setCurrentPage(pagination.value.currentPage)

  rows.value.forEach((row, index) => {
    row.index =
      (pagedData.page.currentPage - 1) * pagedData.page.pageSize + index + 1
  })
}

function getSortIcon(col) {
  if (col.sortable && col.name === pagination.value.sortColumn) {
    return pagination.value.sortOrder === 1
      ? "arrow_drop_up"
      : "arrow_drop_down"
  }
  return ""
}

function showSortIcon(col) {
  return col.sortable && col.name === pagination.value.sortColumn
}

function onSelect() {
  emit("changeSelected", selected)
}

function getColStyle(col) {
  return col.style
}

const showExpandIcon = computed(() => props.expandable)

function toggleExpand(row) {
  row.expanded = !row.expanded
  rows.value.forEach((item) => {
    if (row.id != item.id) item.expanded = false
  })
}

defineExpose({
  reloadData
})
</script>

<style>
.q-table--dense .q-table td {
    padding: 16px 8px;
}

.q-table--dense{

  border-bottom: 1px solid #2d2d2d2d;

}
</style>
