<template>
  <q-input ref="search" outlined :required="required" :rules="rules" dense class="input lookup" v-model="selectedText"
    @update:model-value="searchInLookup" @keydown.enter.prevent.stop="selectRow" @keydown="handleKeyDown"
    debounce="2000" :placeholder="placeholder">

    <template #append>
      <q-icon name="clear" size="16px" color="primary" v-if="!isSearchEmpty" class="cursor-pointer"
        @click="clearSearch" />

      <q-icon @click="isPopupOpen = !isPopupOpen" name="o_expand_more" id="expand-more-icon"
        class="show-lookup-icon cursor-pointer" size="sm" />
    </template>

    <q-menu fit no-parent-event v-model="isPopupOpen" @show="onMenuShow" @hide="onMenuHide" ref="popup"
      transition-show="jump-down" transition-hide="jump-up" no-refocus no-focus class="">
      <q-card class="lookup-card no-box-shadow">
        <q-card-section class="no-padding">
          <q-inner-loading :showing="loadingData" class="inner-loader q-my-lg">
            <q-spinner size="50px" color="primary" />
          </q-inner-loading>
        </q-card-section>

        <!-- //todo: replace lookup-body with no-apdding -->
        <q-card-section class="lookup-body">
          <table id="table" class="text-left full-width text-caption" tabindex="0">
            <slot name="thead" />
            <tbody class="lookup-table-body">
              <tr v-for="(item, index) in rows" :key="item.id" :class="{ 'selected-row': index === selectedRowIndex }"
                @click="onRowClicked(item, index)" class="cursor-pointer">
                <slot name="td" :item="item" :index="index" />
              </tr>
            </tbody>
          </table>
        </q-card-section>

        <q-card-section v-if="pagedRows.length === 0 && !loadingData"
          class="nothing-found no-padding no-results column justify-center items-center q-my-xl">
          <div class="">
            <img class="nothing-found-svg" src="../../../public/page-lost.svg" style="width: 150px" />
          </div>
          <div class="">{{ $t("page.nothing-found") }}</div>
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
    dataSource: String,
    textTemplate: String,
    orderByField: String,
    searchField: String,
    required: Boolean,
    rules: Array,
    placeholder: String
  })

  const emit = defineEmits(["row-selected"])

  const router = useRouter()
  const rows = ref([])
  const loadingData = ref(false)
  const selectedId = ref(null)
  const selectedText = ref("")
  const searchTerm = ref("")
  const defaultPageSize = 5
  const selectedCard = ref(false)
  const businessId = ref("")
  const popup = ref(null)
  const isPopupOpen = ref(false)
  const hasLoadedData = ref(false)
  const table = ref(null)
  let showMenu = false
  let sortColumn = null
  let sortAscending = true
  const search = ref(null)
  const selectedRowIndex = ref(0)
  const pagination = ref({
    sortBy: props.orderByField,
    descending: false,
    currentPage: 1,
    pageSize: defaultPageSize,
    totalItems: 0
  })

  function handleKeyDown(event) {
    switch (event.key) {
      case "Delete":
        clearSearch()
        break
      case "ArrowDown":
        selectNext()
        break
      case "ArrowUp":
        selectPrevious()
        break
    }
  }

  async function clearSearch() {
    setIdText(null)
    emitSelectRow(null)
    onMenuHide()
  }

  async function onRowClicked(item, index) {
    selectedRowIndex.value = index
    setIdText(item)
    hidePopup()
    emitSelectRow(item)
  }

  async function setIdText(item) {
    selectedId.value = item?.id
    setText(item)
    if (isPopupOpen.value) {
      await reloadData()
    }
  }

  function setText(item) {
    if (item == null) selectedText.value = null
    else {
      if (props.textTemplate) {
        selectedText.value = props.textTemplate.replace(
          /{{\s*([\w.]+)\s*}}/g,
          (_, key) => item[key]
        )
      } else selectedText.value = item.title
    }
  }

  function setCustomText(displayText) {
    selectedText.value = displayText
  }

  const isSearchEmpty = computed(() => !selectedId.value)

  const pagedRows = computed(() => {
    return rows.value
  })

  async function reloadData(showLoading = true) {
    if (showLoading) {
      loadingData.value = true
    }
    if (pagedRows.value.length === 0) {
      loadingData.value = true
    } else {
      loadingData.value = false
    }
    await loadData(pagination.value)
  }

  async function loadData(pagination) {
    const loaderTimeout = 1000
    let loadingTimer = setTimeout(() => {
      loadingData.value = true
    }, loaderTimeout)
    selectedCard.value = false

    let filterExpression = []

    if (!selectedId.value && selectedText.value && props.searchField) {
      filterExpression.push({
        fieldName: props.searchField,
        operator: 3,
        value: selectedText.value
      })
    }

    await fetchWrapper
      .post(props.dataSource, {
        pageSize: pagination.pageSize,
        sortColumn: pagination.sortBy,
        sortOrder: pagination.descending ? 2 : 1,
        currentPage: pagination.currentPage,
        //todo: molki, check why search term is not working on backend
        //searchTerm: selectedText.value,
        filterExpression: filterExpression
      })
      .then((response) => {
        handleResponse(response.data.data, pagination)
      })
      .finally(() => {
        clearTimeout(loadingTimer)
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

  function isSelected(index) {
    return selectedCard.value === index
  }

  async function lookupShow() {
    if (!hasLoadedData.value) {
      document.getElementById("table")?.focus()
      search.value.focus()
      showPopup()
      await reloadData()
      hasLoadedData.value = true
    } else {
      document.getElementById("table")?.focus()
      search.value.focus()
      showPopup()
    }
  }

  async function selectPrevious() {
    if (selectedRowIndex.value === 0) {
      selectedRowIndex.value = rows.value.length - 1
    } else {
      selectedRowIndex.value--
    }
    await showPopup()
  }

  async function selectNext() {
    if (selectedRowIndex.value === rows.value.length - 1) {
      selectedRowIndex.value = 0
    } else {
      selectedRowIndex.value++
    }
    await showPopup()
  }

  function selectRow() {
    const item = rows.value[selectedRowIndex.value]
    setIdText(item)
    hidePopup()
    emitSelectRow(item)
  }

  function emitSelectRow(item) {
    emit("row-selected", item)
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
    showPopup()
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

  async function showPopup() {
    popup.value.show()
  }

  function hidePopup() {
    popup.value.hide()
  }

  defineExpose({
    sortSelectedColumn,
    pagination,
    setIdText,
    setCustomText
  })

  onMounted(() => {
    onMenuHide()
  })

  watch(isPopupOpen, async (newValue) => {
    if (newValue) {
      lookupShow()
    }
  })
</script>

<style>
  .lookup-card {
    width: 400px !important;
  }

  .lookup-body {
    padding: 1px;
  }

  td {
    padding: 16px;
  }

  th {
    padding: 24px 12px;
  }

  table {
    border-collapse: collapse;
    border: none;
  }

  table:focus,
  .plan-title-card:focus {
    outline: none;
  }

  .container {
    position: absolute;
    padding-top: 16px;
    padding-right: 12px;
    right: 0;
    z-index: 1;
  }
</style>