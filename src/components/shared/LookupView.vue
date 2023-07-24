<template>
  <q-card class="plan-title-card no-shadow">
    <q-card-section v-if="!showSearchbar" class="">
      <slot name="search-bar">
        <div class="search-bar">
          <q-input
            outlined
            dense
            class="text-caption"
            v-model="searchTerm"
            :placeholder="$t('page.card-searchbar')"
            @keydown.enter="reloadData"
          >
            <template v-slot:prepend>
              <q-icon
                name="search"
                class="search-icon cursor-pointer"
                size="sm"
                color="primary"
                @click="reloadData"
              />
            </template>
            <template v-slot:append>
              <q-icon
                name="cancel"
                class="cursor-pointer"
                size="sm"
                color="grey-5"
                @click="clearSearch"
                v-if="!isSearchEmpty"
              />
            </template>
          </q-input>
        </div>
      </slot>
    </q-card-section>
    <q-separator />
    <q-linear-progress
      class="progress q-mb-sm"
      indeterminate
      size="xs"
      v-if="loadingData"
    />
    <!-- <q-card-section v-if="pagedRows.length > 0"> </q-card-section> -->
    <table
      class="plan-title-table text-left full-width q-mt-md text-caption"
      ref="table"
      @keydown.up="selectPrevious"
      @keydown.down="selectNext"
      @keydown.enter="selectedCard"
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
          tabindex="1"
          v-for="(item, index) in rows"
          :key="item.id"
          :class="{ 'selected-row': index === selectedCardIndex }"
          @click="onRowClicked(index)"
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
</template>

<script setup>
import { fetchWrapper } from "../../helpers"
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  defineEmits,
  defineProps
} from "vue"
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
  businessTitle: String,
  selectedPlan: String
})

const emit = defineEmits(["selected-plan"])

const router = useRouter()
const rows = ref([])
const loadingData = ref(false)
const searchTerm = ref("")
const defaultPageSize = 5
const selectedCard = ref(false)
const businessId = ref("")
const selectedCardIndex = ref(0)
const pagination = ref({
  sortBy: props.orderByField,
  descending: false,
  currentPage: 1,
  pageSize: defaultPageSize,
  totalItems: 0
})
async function clearSearch() {
  searchTerm.value = ""
  await reloadData()
}

const selectedRowIndex = computed(() => selectedCardIndex.value)
function onRowClicked(index) {
  selectedCardIndex.value = index
  const selectedPlan = rows.value[index]
  emit("selected-plan", selectedPlan)
}

const isSearchEmpty = computed(
  () => !searchTerm.value || searchTerm.value.trim().length === 0
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

// async function onRequest(props) {
//   await loadData(props.pagination)
// }

async function loadData(data) {
  loadingData.value = true
  selectedCard.value = false

  let filterExpression = []

  if (searchTerm.value) {
    filterExpression.push({
      fieldName: props.searchField,
      operator: 3,
      value: searchTerm.value
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

defineExpose({
  reloadData
})

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

const showPagebar = computed(() => {
  return pagination.value.totalItems > defaultPageSize
})

const showPaging = computed(
  () => pagination.value.totalItems > pagination.value.pageSize
)
const maxPage = computed(() =>
  Math.ceil(pagination.value.totalItems / pagination.value.pageSize)
)
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
</style>
