<template>
  <q-card class="q-card-desktop q-my-lg gt-xs no-shadow">
    <card-container>
      <template #header></template>
      <template #body>
        <data-view
          title="my second business list"
          color="bg-primary_text-white"
          dataSource="business/getBusinessGridData"
          :columns="columns2"
          @changeSelected="gridChangeSelected"
        >
        </data-view>
      </template>
      <template #footer></template>
    </card-container>
  </q-card>
</template>

<script setup>
import DesktopViewGuide from "../../components/business/DesktopViewGuide.vue"
import { fetchWrapper } from "../../helpers"
import { computed, onMounted, onBeforeUnmount, watch } from "vue"
import { ref } from "vue"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"

const router = useRouter()
const $q = useQuasar()

const rows = ref([])
const showGuideDialog = ref(false)
const loadingData = ref(false)
const searchTerm = ref("")
const defaultPageSize = 5
const selectedCard = ref(false)

const pagination = ref({
  sortBy: "title",
  descending: false,
  currentPage: 1,
  pageSize: defaultPageSize,
  totalItems: 0
})

const showPagebar = computed(() => {
  return pagination.value.totalItems > defaultPageSize
})

const showPaging = computed(() => {
  return pagination.value.totalItems > pagination.value.pageSize
})

const showSearchbar = computed(() => {
  return true
  return pagination.value.totalItems > defaultPageSize || !isSearchEmpty.value
})

function clearSearch() {
  searchTerm.value = ""
  reloadData()
}

const isSearchEmpty = computed(
  () => !searchTerm.value || searchTerm.value.trim().length === 0
)

const maxPage = computed(() =>
  Math.ceil(pagination.value.totalItems / pagination.value.pageSize)
)

const pagedRows = computed(() => {
  return rows.value
})

onMounted(() => {
  reloadData()
})

async function reloadData() {
  loadData(pagination.value)
}

async function loadData(data) {
  loadingData.value = true
  selectedCard.value = false

  let filterExpression = []

  if (searchTerm.value) {
    filterExpression.push({
      fieldName: "b.title",
      operator: 3,
      value: searchTerm.value
    })
  }

  const response = await fetchWrapper
    .post("business/getBusinessGridData", {
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
  //pagination.value = response.data.page
  pagination.totalItems = response.data.page.totalItems
  pagination.pageSize = response.data.page.pageSize
  pagination.currentPage = response.data.page.currentPage
  pagination.sortBy = pagination.sortBy
  pagination.descending = pagination.descending
}

async function gotoBusiness() {}

async function goToPaymentHistory() {
  router.push("/business/Payments")
}

function selectCard(index) {
  selectedCard.value = index
}

function isSelected(index) {
  return selectedCard.value === index
}

import DataGrid from "../../components/shared/DataGrid.vue"
import TestContainer from "../../components/shared/TestContainer.vue"
const gridBusiness = ref(null)

const columns = [
  {
    name: "row-number",
    required: true,
    label: "#",
    align: "left",
    sortable: false,
    headerStyle: "width: 5px"
  },
  {
    name: "name",
    required: true,
    label: "name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: "toDate",
    required: true,
    label: "to date",
    align: "left",
    field: "toDateString",
    sortable: true,
    headerStyle: "width: 50px"
  },
  {
    name: "dateCreated",
    required: true,
    label: "dayes to expire",
    field: (row) => row.daysToExpire,
    sortable: true,
    headerStyle: "width: 50px"
  }
]

const columns2 = [
  {
    name: "row-number",
    required: true,
    label: "#",
    align: "left",
    sortable: false,
    headerStyle: "width: 5px"
  },
  {
    name: "name",
    required: true,
    label: "name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true
  }
]

function reloadData_test() {
  gridBusiness.value.reloadData()
}

import DataView from "../../components/shared/DataView.vue"
import CardContainer from "../../components/shared/CardContainer.vue"
</script>

<style lang="scss">
.q-card-desktop {
  width: 620px !important;
}

.business-name {
  max-width: 150px;
}
</style>
