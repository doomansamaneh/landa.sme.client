<template>
  <q-input
    ref="search"
    outlined
    :required="required"
    :rules="rules"
    dense
    class="input lookup"
    v-model="selectedText"
    @update:model-value="searchInLookup"
    @keydown.enter.prevent.stop="selectRow"
    @keydown="handleKeyDown"
    debounce="1000"
    :placeholder="placeholder"
  >
    <template #append>
      <q-icon
        name="clear"
        size="16px"
        color="primary"
        v-if="!isSearchEmpty"
        class="cursor-pointer"
        @click="clearSearch"
      />

      <q-icon
        @click="handlePopup"
        name="o_expand_more"
        id="expand-more-icon"
        class="show-lookup-icon cursor-pointer"
        size="sm"
      />
    </template>

    <q-menu
      fit
      no-parent-event
      v-model="isPopupOpen"
      @show="onMenuShow"
      @hide="onMenuHide"
      ref="popup"
      transition-show="jump-down"
      transition-hide="jump-up"
      no-refocus
      no-focus
    >
      <!-- <div class="container_ lookup-container"> -->
      <div :class="containerClass">
        <q-inner-loading
          :showing="tableStore.showLoader.value"
          class="inner-loader q-my-lg"
        >
          <q-spinner
            size="52px"
            color="primary"
          />
        </q-inner-loading>

        <div class="q-table__middle scroll">
          <table
            class="q-table"
            ref="table"
            tabindex="0"
          >
            <slot name="thead" />
            <tbody class="lookup-table-body">
              <tr
                v-for="(row, index) in tableStore.rows.value"
                :key="row.id"
                :class="{ 'row-active': index === selectedRowIndex }"
                @click="onRowClicked(row, index)"
                class="cursor-pointer"
              >
                <slot
                  name="td"
                  :row="row"
                  :index="index"
                />
              </tr>
            </tbody>
          </table>

          <div
            v-if="!tableStore.loading.value && tableStore.rows.value.length == 0"
            class="q-table__bottom items-center q-table__bottom--nodata"
          >
            <slot name="noDataFound">
              <no-data-found />
            </slot>
          </div>
        </div>

        <div
          v-if="tableStore.showPagebar.value"
          class="q-table__bottom"
        >
          <page-bar
            :pagination="tableStore.pagination.value"
            @page-changed="tableStore.reloadData"
          >
            <template #reload>
              <q-icon
                class="icon-hover dark-3 cursor-pointer q-pr-md"
                size="sm"
                name="o_refresh"
                @click="tableStore.reloadData"
                clickable
              >
                <q-tooltip
                  class="custom-tooltip"
                  :delay="600"
                >
                  {{ $t("page.buttons.reload-data") }}
                </q-tooltip>
              </q-icon>
            </template>
          </page-bar>
        </div>
      </div>
    </q-menu>
  </q-input>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useQuasar } from "quasar"
import { useDataTable } from "src/composables/useDataTable"
import PageBar from "./PageBar.vue"
import NoDataFound from "./NoDataFound.vue"

const props = defineProps({
  dataSource: String,
  textTemplate: String,
  orderByField: String,
  searchField: String,
  required: Boolean,
  rules: Array,
  placeholder: String
})
const $q = useQuasar()
const selectedId = ref(null)
const selectedText = ref("")

const store = {
  pagination: ref({
    currentPage: 1,
    pageSize: 7,
    sortColumn: props.orderByField,
    sortOrder: 1,
    searchTerm: selectedText
  })
}

const tableStore = useDataTable(props.dataSource, props.columns, store)

const emit = defineEmits(["row-selected"])

const search = ref(null)
const selectedRowIndex = ref(0)
const popup = ref(null)
const isPopupOpen = ref(false)
const table = ref(null)

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
  tableStore.setActiveRow(null)
  setIdText(null)
  emitSelectRow(null)
  onMenuHide()
}

async function onRowClicked(row, index) {
  selectedRowIndex.value = index
  selectRow(row)
}

async function setIdText(row) {
  selectedId.value = row?.id
  setText(row)
}

function setText(row) {
  if (row == null) selectedText.value = null
  else {
    if (props.textTemplate) {
      selectedText.value = props.textTemplate.replace(
        /{{\s*([\w.]+)\s*}}/g,
        (_, key) => row[key] ?? ""
      )
    } else selectedText.value = row.title
  }
}

function setCustomText(displayText) {
  selectedText.value = displayText
}

async function handlePopup() {
  if (isPopupOpen.value) hidePopup()
  else {
    showPopup()
    await tableStore.loadData()
  }
}

function selectPrevious() {
  if (isPopupOpen.value) {
    if (selectedRowIndex.value === 0)
      selectedRowIndex.value = tableStore.rows.value.length - 1
    else selectedRowIndex.value--
  }
}

async function selectNext() {
  if (isPopupOpen.value) {
    if (selectedRowIndex.value === tableStore.rows.value.length - 1)
      selectedRowIndex.value = 0
    else selectedRowIndex.value++
  } else {
    showPopup()
    await tableStore.loadData()
  }
}

function selectRow() {
  const row = tableStore.rows.value[selectedRowIndex.value]
  tableStore.setActiveRow(row)
  setIdText(row)
  hidePopup()
  emitSelectRow(row)
}

function emitSelectRow(row) {
  emit("row-selected", row)
}

async function searchInLookup() {
  showPopup()
  await tableStore.reloadData()
}

function onMenuHide() {
  isPopupOpen.value = false
  search.value.focus()
}

async function showPopup() {
  popup.value.show()
}

function onMenuShow() {
  isPopupOpen.value = true
  search.value.focus()
}

function hidePopup() {
  popup.value.hide()
}

const isSearchEmpty = computed(() => !selectedId.value)

const cardDefaultClass = computed(() =>
  " lookup-container q-table__card q-table--bordered_q-table--flat" +
  ($q.dark.isActive === true ? " q-table__card--dark q-dark" : "")
)

const __containerClass = computed(() =>
  `q-table__container _q-table--horizontal-separator column _no-wrap q-pt-md` +
  cardDefaultClass.value +
  ($q.dark?.isActive === true ? " q-table--dark" : "")
)

const containerClass = computed(() =>
  __containerClass.value + (tableStore.showLoader.value === true ? " q-table--loading" : "")
)

defineExpose({
  setIdText,
  setCustomText,
  selectedId,
  selectedText,
  tableStore
})
</script>

<style>
.lookup-container {
  width: 500px;
}

.lookup-table-head th {
  border-bottom: 1px solid;
}

/* .lookup-body {
  padding: 12px 0px;
} */

/* td {
  padding: 16px;
}

th {
  padding: 24px 12px;
} */

/* table {
  border-collapse: collapse;
  border: none;
} */

table:focus {
  outline: none;
}

.lookup-toolbar {
  position: absolute;
  right: 5px;
  top: 25px;
  z-index: 1;
}
</style>