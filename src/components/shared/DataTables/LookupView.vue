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
    :loading="tableStore.inputInnerLoader.value"
  >
    <template #append>
      <q-icon
        name="o_close"
        v-if="!isSearchEmpty"
        class="cursor-pointer q-field__focusable-action"
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
      :anchor="$q.screen.lt.sm ? 'bottom middle' : ''"
      :self="$q.screen.lt.sm ? 'top middle' : ''"
      no-focus
      no-refocus
    >
      <q-inner-loading
        :showing="tableStore.showLoader.value"
        class="inner-loader_ q-mt-xl"
      >
        <q-spinner
          size="52px"
          color="primary"
        />
      </q-inner-loading>

      <div
        class="header text-caption text-bold q-pa-md bg-dark z-max"
        style="border-bottom: 1px solid var(--q-primary);"
      >
        <slot name="thead" />
      </div>
      <div
        class="cursor-pointer"
        v-for="(row, index) in tableStore.rows.value"
        :key="row.id"
        :class="{ 'row-active': index === selectedRowIndex }"
        @click="onRowClicked(row, index)"
      >
        <slot
          name="td"
          :row="row"
          :index="tableStore.rowIndex(index)"
        />
      </div>

      <div
        v-if="!tableStore.showLoader.value && tableStore.rows.value.length == 0"
        class="q-table__bottom items-center q-table__bottom--nodata"
      >
        <slot name="noDataFound">
          <no-data-found />
        </slot>
      </div>

      <div
        v-if="tableStore.showPagebar.value"
        class="q-pa-md row items-center footer dark-1"
      >
        <page-bar
          :pagination="tableStore.pagination.value"
          @page-changed="tableStore.reloadData"
        >
          <template #reload>
            <q-btn
              class="q-mr-md"
              size="sm"
              round
              dense
              unelevated
              icon="o_refresh"
              @click="tableStore.reloadData"
            />
          </template>
        </page-bar>
      </div>

    </q-menu>
  </q-input>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useQuasar } from "quasar"
import { useDataTable } from "src/composables/useDataTable"
import PageBar from "src/components/shared/dataTables/PageBar.vue"
import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue"
// import CustomInput from "src/components/shared/forms/CustomInput.vue"

const props = defineProps({
  dataSource: String,
  textTemplate: String,
  orderByField: String,
  searchField: String,
  columns: String,
  required: Boolean,
  rules: Array,
  placeholder: String
})

const selectedId = defineModel('selectedId')
const selectedText = defineModel('selectedText')

const $q = useQuasar()
// const selectedId = ref(null)
// const selectedText = ref("")

const store = {
  pagination: ref({
    currentPage: 1,
    pageSize: 7,
    columns: props.columns,
    sortColumn: props.orderByField,
    sortOrder: 1,
    searchTerm: selectedText
  })
}

const tableStore = useDataTable(props.dataSource, null, store)

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
  await showPopup()
}

function onMenuHide() {
  isPopupOpen.value = false
  search.value.focus()
}

async function showPopup() {
  await tableStore.reloadData();
  popup.value.show();
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
  `q-table__container _q-table--horizontal-separator column _no-wrap` +
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
.header {
  position: sticky;
  top: 0;
}

.footer {
  position: sticky;
  bottom: 0;
}
</style>
