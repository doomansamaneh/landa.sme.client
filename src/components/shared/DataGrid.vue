<template>
  <q-table
    row-key="id"
    :card-class="color"
    card="blue"
    color="green"
    bordered
    flat
    :loading="loading"
    :rows="rows"
    :title="title"
    v-model:pagination="pageSetting"
    :rows-per-page-options="[5, 10, 25, 50, 100]"
    @request="onRequest"
    binary-state-sort
    :columns="columns"
    :table-style="
      'counter-reset: cssRowCounter ' +
      (pageSetting.page - 1) * pageSetting.rowsPerPage +
      ';'
    "
  >
    <template v-slot:body-cell-row-number>
      <q-td><span class="rowNumber" /> </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { fetchWrapper } from "src/helpers"

const props = defineProps({
  sortBy: String,
  columns: Array,
  title: String,
  dataSource: String,
  color: String
})

// const emits = defineEmits(['changeSelected'])

const filter = ref("")
const selected = ref([])
const rows = ref([])
const loading = ref(false)

const pageSetting = ref({
  sortBy: props.sortBy,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})

onMounted(() => {
  reloadData()
})

async function reloadData() {
  await loadData(pageSetting)
}

async function onRequest(props) {
  await loadData(props.pagination)
}

async function loadData(pagination) {
  loading.value = true
  await fetchWrapper
    .post(props.dataSource, {
      pageSize: pageSetting.value.rowsPerPage,
      sortColumn: pageSetting.value.sortBy,
      sortOrder: pageSetting.value.descending ? 1 : 2,
      currentPage: pageSetting.value.page
      //columns: columns
    })
    .then((response) => {
      handleResponse(response.data.data, pagination)
    })
    .finally(() => {
      loading.value = false
    })
}

function handleResponse(pagedData, pagination) {
  rows.value = pagedData.items
  pageSetting.value.rowsNumber = pagedData.page.totalItems
  pageSetting.value.rowsPerPage = pagedData.page.pageSize
  pageSetting.value.page = pagedData.page.currentPage
  pageSetting.value.sortBy = pagination.sortBy
  pageSetting.value.descending = pagination.descending
}

function onSelect() {
  emit("changeSelected", selected)
}

defineExpose({
  reloadData
})
</script>

<style>
.rowNumber::before {
  counter-increment: cssRowCounter;
  content: counter(cssRowCounter) ". ";
}
</style>
