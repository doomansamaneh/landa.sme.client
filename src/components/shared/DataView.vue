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

    <q-card-section
      v-if="!showSearchbar"
      class="q-pb-xs"
    >
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
        <slot
          name="item"
          :item="item"
        ></slot>
      </div>
    </q-card-section>

    <q-card-section v-if="pagedRows.length === 0 && !loadingData">
      <div class="nothing-found no-results column justify-center items-center q-my-xl">
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

      <page-bar class="q-pa-md dark-1"
        :pagination="pagination"
        @page-changed="loadData"
      />
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { fetchWrapper } from "src/helpers"
import { usePaginationStore } from "src/stores/page-store.js"
import PageBar from "./PageBar.vue"

const props = defineProps({
  title: String,
  dataSource: String,
  color: String,
  orderByField: String,
  searchField: String,
  storeName: String
})

const pageBar=ref(null)

const paginationStore = usePaginationStore(props.storeName)

const rows = ref([])
const loadingData = ref(false)
const searchTerm = ref("")
const defaultPageSize = 5
const selectedCard = ref(false)

const pagination = ref({
  currentPage: paginationStore.currentPage,
  pageSize: defaultPageSize,
  sortColumn: props.orderByField,
  sortOrder: 1,
  totalItems: 0,
  searchTerm: "",
  filterExpression: [],
})

async function clearSearch() {
  searchTerm.value = ""
  await reloadData()
}

onMounted(() => {
  reloadData()
})

async function reloadData() {
  await loadData()
}

async function loadData() {
  loadingData.value = true
  selectedCard.value = false

  setFilterExpression()

  await fetchWrapper
    .post(props.dataSource, pagination.value)
    .then((response) => {
      handleResponse(response.data.data)
    })
    .finally(() => {
      loadingData.value = false
    })
}

function setFilterExpression() {
  let filterExpression = []

  if (searchTerm.value) {
    filterExpression.push({
      fieldName: props.searchField,
      operator: 3,
      value: searchTerm.value
    })
  }
  pagination.value.filterExpression = filterExpression
}

function handleResponse(pagedData) {
  rows.value = pagedData.items
  pagination.value.totalItems = pagedData.page.totalItems
  paginationStore.setCurrentPage(pagination.value.currentPage)
}

function selectCard(index) {
  selectedCard.value = index
}

function isSelected(index) {
  return selectedCard.value === index
}

const isSearchEmpty = computed(() =>
  !searchTerm.value || searchTerm.value.trim().length === 0
)

const pagedRows = computed(() => {
  return rows.value
})

defineExpose({
  reloadData
})
</script>

<style lang="scss" scoped>
.card-desktop {
  width: 700px !important;
}
</style>
