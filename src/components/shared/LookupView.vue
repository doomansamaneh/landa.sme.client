<template>
  <q-input ref="search" outlined :required="required" :rules="rules" dense class="input lookup" v-model="selectedText"
    @update:model-value="searchInLookup" @keydown.enter.prevent.stop="selectRow" @keydown="handleKeyDown"
    debounce="1000" :placeholder="placeholder">
    <template #append>
      <q-icon name="clear" size="16px" color="primary" v-if="!isSearchEmpty" class="cursor-pointer"
        @click="clearSearch" />

      <q-icon @click="handlePopup" name="o_expand_more" id="expand-more-icon" class="show-lookup-icon cursor-pointer"
        size="sm" />
    </template>

    <q-menu fit no-parent-event v-model="isPopupOpen" @show="onMenuShow" @hide="onMenuHide" ref="popup"
      transition-show="jump-down" transition-hide="jump-up" no-refocus no-focus>
      <div class="container_ lookup-container">
        <q-inner-loading :showing="showLoader" class="inner-loader q-my-lg">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>

        <div class="lookup-body">
          <table ref="table" class="text-left text-caption" tabindex="0">
            <slot name="thead" />
            <tbody class="lookup-table-body">
              <tr v-for="(item, index) in rows" :key="item.id" :class="{ 'selected-row': index === selectedRowIndex }"
                @click="onRowClicked(item, index)" class="cursor-pointer">
                <slot name="td" :item="item" :index="index" />
              </tr>
            </tbody>
          </table>

          <div v-if="noDataFound"
            class="nothing-found no-padding no-results column justify-center items-center q-my-xl">
            <div class="">
              <img class="nothing-found-svg" src="../../../public/page-lost.svg" style="width: 150px" />
            </div>
            <div class="">{{ $t("page.nothing-found") }}</div>
          </div>
        </div>

        <page-bar :pagination="pagination" @page-changed="loadData" />
      </div>
    </q-menu>
  </q-input>
</template>

<script setup>
  import { fetchWrapper } from "src/helpers"
  import { ref, computed, onMounted } from "vue"
  import { useQuasar } from "quasar"
  import { useRouter } from "vue-router"
  import businessRoutes from "src/router/business-routes"
  import PageBar from "src/components/shared/PageBar.vue"

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
  const showLoader = ref(false)
  const loadingData = ref(false)
  const selectedId = ref(null)
  const selectedText = ref("")
  const searchTerm = ref("")
  const defaultPageSize = 5
  const businessId = ref("")

  let sortColumn = null
  let sortAscending = true

  const pagination = ref({
    sortBy: props.orderByField,
    descending: false,
    currentPage: 1,
    pageSize: defaultPageSize,
    totalItems: 0
  })

  const search = ref(null)
  const selectedRowIndex = ref(0)
  const popup = ref(null)
  const isPopupOpen = ref(false)
  const hasLoadedData = ref(false)
  const table = ref(null)
  let showMenu = false

  onMounted(() => {
    onMenuHide()
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

  async function reloadData(showLoading = true) {
    //todo: how to cache data reloading
    await loadData(pagination.value)
  }

  async function loadData(pagination) {
    const loaderTimeout = 500
    loadingData.value = true;
    let loadingTimer = setTimeout(() => {
      if (loadingData.value) showLoader.value = true
    }, loaderTimeout)


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
        loadingData.value = false;
        showLoader.value = false
        if (rows?.value.length < selectedRowIndex.value + 1)
          selectedRowIndex.value = 0
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

  function handlePopup() {
    if (isPopupOpen.value) hidePopup()
    else showPopup()
  }

  function selectPrevious() {
    if (isPopupOpen.value) {
      if (selectedRowIndex.value === 0)
        selectedRowIndex.value = rows.value.length - 1
      else selectedRowIndex.value--
    }
  }

  function selectNext() {
    if (isPopupOpen.value) {
      if (selectedRowIndex.value === rows.value.length - 1)
        selectedRowIndex.value = 0
      else selectedRowIndex.value++
    } else {
      showPopup()
    }
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

  async function searchInLookup() {
    await showPopup()
  }

  function onMenuShow() {
    isPopupOpen.value = true
  }

  function onMenuHide() {
    isPopupOpen.value = false
    search.value.focus()
  }

  async function sortSelectedColumn(selectedColumn) {
    if (pagination.value.sortBy === selectedColumn) {
      pagination.value.descending = !pagination.value.descending
    } else {
      pagination.value.sortBy = selectedColumn
      pagination.value.descending = false
    }

    await reloadData()
  }

  async function showPopup() {
    popup.value.show()
    await reloadData()
  }

  function hidePopup() {
    popup.value.hide()
  }

  function onMenuShow() {
    isPopupOpen.value = true;
    search.value.focus()
  }

  async function showPopup() {
    popup.value.show()
    await reloadData()
  }

  function hidePopup() {
    popup.value.hide()
  }

  const isSearchEmpty = computed(() => !selectedId.value)

  const noDataFound = computed(() => rows.value.length === 0 && !loadingData.value)

  defineExpose({
    sortSelectedColumn,
    pagination,
    setIdText,
    setCustomText
  })

  defineExpose({
    sortSelectedColumn,
    pagination,
    setIdText,
    setCustomText
  })
</script>

<style>
  .lookup-container {
    width: 400px;
    /* min-height: 100px; */
  }

  .lookup-body {
    padding: 1px 0px;
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
    /* width: 100%; */
  }

  table:focus,
  .plan-title-card:focus {
    outline: none;
  }
</style>