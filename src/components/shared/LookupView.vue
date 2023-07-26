<template>
  <q-input
    ref="search"
    outlined
    dense
    class="input lookup"
    v-model="selectedRow"
    @input="selectRow"
    @keyup.stop="searchInLookup"
    @keydown.down="selectNext"
    @keydown.up="selectPrevious"
    @keydown.enter="selectRow"
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
      class="menu"
      v-show="showMenu"
    >
      <q-card class="plan-title-card no-shadow">
        <q-linear-progress
          class="progress q-mb-sm"
          indeterminate
          size="xs"
          v-if="loadingData"
        />
        <table
          id="table"
          class="plan-title-table text-left full-width q-mt-md text-caption"
          tabindex="0"
        >
          <thead class="text-caption">
            <tr class="">
              <th class=""><span>#</span></th>
              <th class=""><span>عنوان</span></th>
              <th style=""><span>هزینه ماهانه</span></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in rows"
              :key="item.id"
              :class="{ 'selected-row': index === selectedCardIndex }"
              @click="onRowClicked(item, index)"
              class="cursor-pointer"
            >
              <td>{{ item.statusId }}</td>
              <td>
                <span>{{ item.planTitle }}</span>
              </td>
              <td>{{ item.daysToExpire }}</td>
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

        <page-bar :pagination="pagination" @page-changed="loadData" />
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
const rows = ref([])
let debounceTimer
const loadingData = ref(false)
const selectedRow = ref("")
const searchTerm = ref("")
const defaultPageSize = 5
const selectedCard = ref(false)
const businessId = ref("")
const popup = ref(null)
const table = ref(null)
let showMenu = false
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
  loadingData.value = true
  selectedCard.value = false

  let filterExpression = []

  if (selectedRow.value) {
    filterExpression.push({
      fieldName: props.searchField,
      operator: 3,
      value: selectedRow.value
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
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    reloadData()
    popup.value.show()
  }, 2000)
}

function onMenuShow() {
  table.value.focus()
}

function onMenuHide() {
  search.value.focus()
}
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
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 16px;
  padding-left: 16px;
}
th {
  padding-top: 0;
  padding-bottom: 16px;
  padding-right: 16px;
  padding-left: 16px;
}
table {
  border-collapse: collapse;
  border: none;
}

thead {
  border-bottom: 2px solid red;
  margin-bottom: 20px;
}
tbody {
  padding-top: 20px;
}

tbody tr:hover {
  background-color: #ebebeb;
}

.selected-row {
  background-color: #fffae5 !important;
}

table:focus,
.plan-title-card:focus {
  outline: none;
}

.show-lookup-icon:hover {
  color: rgb(0, 187, 255);
}
</style>
