<template>
  <q-card class="card-desktop">
    <slot name="header"></slot>
    <q-separator />
    <q-linear-progress
      class="progress"
      indeterminate
      size="xs"
      v-if="loadingData"
    />

    <q-card-section class="q-px-lg q-gutter-y-md">
      <slot name="search-bar">
        <div class="search-bar q-pt-sm" v-if="showSearchbar">
          <q-input
            outlined
            dense
            class="text-caption q-mb-sm"
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

      <div
        class="row justify-between items-center no-shadow q-py-md q-px-md cursor-pointer"
        v-for="(item, index) in pagedRows"
        :key="index"
        @click="selectCard(index)"
        :class="{ selected: isSelected(index) }"
      >
        <slot name="item" :item="item"></slot>
      </div>

      <div
        class="nothing-found q-py-xl q-mb-md q-mt-xs no-results column justify-center items-center q-gutter-y-md"
        v-if="showSearchbar && pagedRows.length === 0 && !loadingData"
      >
        <div class="">
          <!-- <q-avatar
            icon="search"
            size="3rem"
            class="no-results-icon"
            round
            color="primary"
            text-color="white"
          /> -->
          <q-img
            class="nothing-found-svg"
            src="../../../public/page-lost.svg"
            style="width: 200px"
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
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  defineProps,
  defineEmits
} from "vue"
import { ref } from "vue"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
import businessRoutes from "src/router/business-routes"
import PageBar from "./PageBar.vue"

const router = useRouter()
const rows = ref([])
const loadingData = ref(false)
const searchTerm = ref("")
const defaultPageSize = 5
const selectedCard = ref(false)
const businessId = ref("")

const thisProps = defineProps({
  title: String,
  dataSource: String,
  color: String,
  orderByField: String,
  searchField: String,
  businessTitle: String
})

const pagination = ref({
  sortBy: thisProps.orderByField,
  descending: false,
  currentPage: 1,
  pageSize: defaultPageSize,
  totalItems: 0
})

function clearSearch() {
  searchTerm.value = ""
  reloadData()
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
  loadData(pagination.value)
}

async function loadData(data) {
  loadingData.value = true
  selectedCard.value = false

  let filterExpression = []

  if (searchTerm.value) {
    filterExpression.push({
      fieldName: thisProps.searchField,
      operator: 3,
      value: searchTerm.value
    })
  }

  const response = await fetchWrapper
    .post(thisProps.dataSource, {
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

function selectCard(index) {
  selectedCard.value = index
}

function isSelected(index) {
  return selectedCard.value === index
}
</script>

<style>
.card-desktop {
  width: 620px !important;
}

.q-field--auto-height.q-field--dense .q-field__native {
  font-weight: 500;
}

.nothing-found-svg {
  width: 200px;
}
</style>