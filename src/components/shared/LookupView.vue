<template>
  <q-input
    ref="search"
    outlined
    required
    :rules="[(val) => val && val.length > 0]"
    lazy-rules
    dense
    class="input lookup"
    v-model="selectedRow"
    @update:model-value="searchInLookup"
    @keydown.down="selectNext"
    @keydown.up="selectPrevious"
    @keydown.enter.prevent.stop="selectRow"
    debounce="2000"
  >
    <template #append>
      <q-icon
        name="clear"
        size="16px"
        color="primary"
        v-if="selectedRow && selectedRow.length > 0"
        class="cursor-pointer"
        @click="clearSearch"
      />

      <q-icon
        @click="lookupShow"
        name="o_expand_more"
        id="expand-more-icon"
        class="show-lookup-icon cursor-pointer"
        size="sm"
      />
    </template>
    <q-menu
      fit
      no-parent-event
      @show="onMenuShow"
      @hide="onMenuHide"
      ref="popup"
      transition-show="jump-down"
      transition-hide="jump-up"
      no-refocus
      no-focus
    >
      <q-card class="plan-title-card no-shadow">
        <q-inner-loading :showing="loadingData">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>
        <table
          id="table"
          class="plan-title-table text-left full-width text-caption"
          tabindex="0"
        >
          <thead class="lookup-table-head">
            <tr class="">
              <slot name="th" />
            </tr>
          </thead>
          <tbody class="lookup-table-body">
            <tr
              v-for="(item, index) in rows"
              :key="item.id"
              :class="{ 'selected-row': index === selectedCardIndex }"
              @click="onRowClicked(item, index)"
              class="cursor-pointer"
            >
              <slot name="td" :item="item" />
            </tr>
          </tbody>
        </table>
        <q-card-section v-if="pagedRows.length === 0 && !loadingData">
          <div
            class="nothing-found no-results column justify-center items-center q-my-xl"
          >
            <div class="">
              <img
                class="nothing-found-svg"
                src="../../../public/page-lost.svg"
                style="width: 150px"
              />
            </div>
            <div class="">{{ $t("page.nothing-found") }}</div>
          </div>
        </q-card-section>

        <div class="q-pt-sm">
          <page-bar :pagination="pagination" @page-changed="loadData" />
        </div>
      </q-card>
    </q-menu>
  </q-input>
</template>

<script setup>
import { fetchWrapper } from "../../helpers"
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
import businessRoutes from "src/router/business-routes"
import PageBar from "./PageBar.vue"

const props = defineProps({
  title: String,
  dataSource: String,
  color: String,
  orderByField: String,
  searchField: String,
  businessTitle: String
})

const router = useRouter()
const businessNameId = ref()
const rows = ref([])
const loadingData = ref(false)
const selectedRow = ref("")
const searchTerm = ref("")
const defaultPageSize = 5
const selectedCard = ref(false)
const businessId = ref("")
const popup = ref(null)
const table = ref(null)
let showMenu = false
let sortColumn = null
let sortAscending = true
const search = ref(null)
const selectedCardIndex = ref(0)
const pagination = ref({
  sortBy: props.orderByField,
  descending: false,
  currentPage: 1,
  pageSize: defaultPageSize,
  totalItems: 0
})

function clearSearch() {
  selectedRow.value = ""
  reloadData()
}

const selectedRowIndex = computed(() => selectedCardIndex.value)

function clearSelection() {
  selectedRow.value = ""
}

function onRowClicked(item, index) {
  selectedCardIndex.value = index
  popup.value.hide()
  selectedRow.value = `${item.title} - ${item.planTitle}`
}

const isSearchEmpty = computed(
  () => !selectedRow.value || selectedRow.value.trim().length === 0
)

const pagedRows = computed(() => {
  return rows.value
})

onMounted(() => {
  reloadData()
})

async function reloadData() {
  await loadData(pagination.value)
}

async function loadData(data) {
  const loaderTimeout = 500
  let loadingTimer = setTimeout(() => {
    loadingData.value = true
  }, loaderTimeout)
  selectedCard.value = false

  let filterExpression = []

  if (selectedRow.value) {
    filterExpression.push({
      fieldName: props.searchField,
      operator: 3,
      value: selectedRow.value
    })
  }

  if (sortColumn) {
    filterExpression.push({
      fieldName: sortColumn,
      operator: sortAscending ? 1 : 2
    })
  }

  await fetchWrapper
    .post(props.dataSource, {
      pageSize: data.pageSize,
      sortColumn: data.sortBy,
      sortOrder: data.descending ? 1 : 2,
      currentPage: data.currentPage,
      filterExpression: filterExpression
    })
    .then((response) => {
      handleResponse(response, data)
    })
    .finally(() => {
      clearTimeout(loadingTimer)
      loadingData.value = false
    })
}

function handleResponse(response, pagination) {
  rows.value = response.data.items
  pagination.totalItems = response.data.page.totalItems
  pagination.pageSize = response.data.page.pageSize
  pagination.currentPage = response.data.page.currentPage
  pagination.sortBy = pagination.sortBy
  pagination.descending = pagination.descending
}

function isSelected(index) {
  return selectedCard.value === index
}

function lookupShow() {
  document.getElementById("table")?.focus()
  search.value.focus()
  popup.value.show()
}

function selectPrevious() {
  if (selectedCardIndex.value > 0) {
    selectedCardIndex.value--
  }
}

function selectNext() {
  if (selectedCardIndex.value < rows.value.length - 1) {
    selectedCardIndex.value++
  }
}

function selectRow() {
  const selectedItem = rows.value[selectedCardIndex.value]
  selectedRow.value = `${selectedItem.title} - ${selectedItem.planTitle}`
  popup.value.hide()
}

const showPagebar = computed(() => {
  return pagination.value.totalItems > defaultPageSize
})

const showPaging = computed(
  () => pagination.value.totalItems > pagination.value.pageSize
)
const maxPage = computed(() =>
  Math.ceil(pagination.value.totalItems / pagination.value.pageSize)
)

function searchInLookup() {
  popup.value.show()
  reloadData()
}

function onMenuShow() {
  document.getElementById("table")?.focus()
  search.value.focus()
}

function onMenuHide() {
  search.value.focus()
}

function sortSelectedColumn(selectedColumn) {
  if (pagination.value.sortBy === selectedColumn) {
    pagination.value.descending = !pagination.value.descending
  } else {
    pagination.value.sortBy = selectedColumn
    pagination.value.descending = false
  }

  reloadData()
}

defineExpose({
  sortSelectedColumn,
  pagination
})
</script>

<style scoped>
.plan-title-card {
  width: 400px !important;
}

.q-field--auto-height.q-field--dense .q-field__native {
  font-weight: 500;
  font-size: 13px;
}

td {
  padding: 16px;
}

th {
  padding: 16px 12px;
}

table {
  border-collapse: collapse;
  border: none;
}

table:focus,
.plan-title-card:focus {
  outline: none;
}
</style>
