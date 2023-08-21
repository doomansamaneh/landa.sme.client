<template>
  <q-card class="card-desktop no-shadow">
    <slot name="header"> </slot>
    <q-separator />
    <q-linear-progress
      class="progress"
      indeterminate
      size="xs"
      v-if="loadingData"
    />

    <q-card-section v-if="!showSearchbar" class="q-pb-xs">
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
                name="clear"
                class="cursor-pointer"
                size="16px"
                color="primary"
                @click="clearSearch"
                v-if="!isSearchEmpty"
              />
            </template>
          </q-input>
        </div>
      </slot>
    </q-card-section>

    <q-card-section v-if="pagedRows.length > 0">
      <div
        class="row justify-between items-center q-py-md q-px-md cursor-pointer"
        v-for="(item, index) in pagedRows"
        :key="index"
        @click="selectCard(index)"
        :class="{ selected: isSelected(index) }"
      >
        <slot name="item" :item="item"></slot>
      </div>
    </q-card-section>

    <q-card-section v-if="pagedRows.length === 0 && !loadingData">
      <div
        class="nothing-found no-results column justify-center items-center q-my-xl"
      >
        <div class="">
          <img
            class="nothing-found-svg"
            src="page-lost.svg"
            style="width: 150px"
          />
        </div>
        <div class="">{{ $t("page.nothing-found") }}</div>
      </div>
    </q-card-section>

    <page-bar
      :pagination="pagination"
      @page-changed="loadData"
      :storeName="props.storeName"
    />
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
import { fetchWrapper } from "src/helpers"
import { usePaginationStore } from "src/stores/pagination-store.js"
import businessRoutes from "src/router/business-routes"
import PageBar from "./PageBar.vue"

const props = defineProps({
  title: String,
  dataSource: String,
  color: String,
  orderByField: String,
  searchField: String,
  businessTitle: String,
  storeName: String
})

const paginationStore = usePaginationStore(props.storeName)

// const emits = defineEmits(["reload-data"])

const router = useRouter()
const rows = ref([])
const loadingData = ref(false)
const searchTerm = ref("")
const defaultPageSize = 5
const selectedCard = ref(false)
const businessId = ref("")

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

async function loadData(pagination) {
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

  console.log("paginationStore =>", paginationStore)

  await fetchWrapper
    .post(props.dataSource, {
      pageSize: pagination.pageSize,
      sortColumn: pagination.sortBy,
      sortOrder: pagination.descending ? 1 : 2,
      currentPage: paginationStore.currentPage,
      filterExpression: filterExpression
    })
    .then((response) => {
      handleResponse(response.data.data, pagination)
    })
    .finally(() => {
      loadingData.value = false
    })
}

function handleResponse(pagedData, pagination) {
  rows.value = pagedData.items
  pagination.totalItems = pagedData.page.totalItems
  pagination.pageSize = pagedData.page.pageSize
  pagination.currentPage = pagedData.page.currentPage
  pagination.sortBy = pagination.sortBy
  pagination.descending = pagination.descending
}

function selectCard(index) {
  selectedCard.value = index
}

function isSelected(index) {
  return selectedCard.value === index
}

defineExpose({
  reloadData
})
</script>

<style lang="scss" scoped>
.card-desktop {
  width: 700px !important;
}
</style>
