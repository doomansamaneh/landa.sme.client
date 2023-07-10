<template>
  <q-card class="card-desktop">
    <slot name="header"></slot>
    <q-separator />
    <q-linear-progress class="progress" indeterminate size="xs" v-if="loadingData" />

    <q-card-section class="q-px-lg q-gutter-y-md">
      <slot name="search-bar">
        <div class="search-bar q-pt-sm" v-if="showSearchbar">
          <q-input outlined dense class="text-caption q-mb-sm" v-model="searchTerm"
            :placeholder="$t('page.card-searchbar')" @keydown.enter="reloadData">
            <template v-slot:prepend>
              <q-icon name="search" class="search-icon cursor-pointer" size="sm" color="primary" @click="reloadData" />
            </template>
            <template v-slot:append>
              <q-icon name="cancel" class="cursor-pointer" size="sm" color="grey-5" @click="clearSearch"
                v-if="!isSearchEmpty" />
            </template>
          </q-input>
        </div>
      </slot>

      <div class="row justify-between items-center no-shadow q-py-md q-px-md cursor-pointer"
        v-for="(item, index) in pagedRows" :key="index" @click="selectCard(index)"
        :class="{ selected: isSelected(index) }">
        <slot name="item" :item="item"></slot>
      </div>

      <div class="no-results flex justify-center q-my-xl items-center q-gutter-x-sm"
        v-if="showSearchbar && pagedRows.length === 0 && !loadingData">
        <div class="">
          <q-icon name="o_sentiment_dissatisfied" size="sm" class="no-results-icon" />
        </div>
        <div class="">{{ $t("page.nothing-found") }}</div>
      </div>
    </q-card-section>

    <div class="row q-pt-md justify-between dark-1 q-px-lg q-py-md" v-if="showPagebar">
      <div class="pagination col-8 flex items-center">
        <q-pagination v-if="showPaging" v-model="pagination.currentPage" :min="1" :max="maxPage" direction-links
          boundary-links icon-first="keyboard_double_arrow_left" icon-last="keyboard_double_arrow_right"
          icon-prev="chevron_left" icon-next="chevron_right" @update:model-value="reloadData" gutter="xs"
          padding="2px 4px 2px 4px" round color="grey-8" active-color="primary" />
      </div>
      <div class="col-2">
        <q-select dense outlined v-model="pagination.pageSize" :options="[5, 10, 20]" @update:model-value="reloadData"
          transition-show="flip-up" transition-hide="flip-down" class="q-pl-lg dark-2 text-weight-bolder" />
      </div>
    </div>
  </q-card>
</template>

<script setup>
  import { fetchWrapper } from "../../helpers"
  import { computed, onMounted, onBeforeUnmount, watch, defineProps } from "vue"
  import { ref } from "vue"
  import { useQuasar } from "quasar"
  import { useRouter } from "vue-router"

  const router = useRouter()
  const rows = ref([])
  const loadingData = ref(false)
  const searchTerm = ref("")
  const defaultPageSize = 5
  const selectedCard = ref(false)

  const thisProps = defineProps({
    title: String,
    dataSource: String,
    color: String,
    orderByField: String,
    searchField: String
  })

  const pagination = ref({
    sortBy: thisProps.orderByField,
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
</style>