<template>
  <q-table row-key="id" :card-class="color" card="blue" color="green" bordered flat :loading="loading" :rows="rows"
    :title="title" v-model:pagination="pagination" :rows-per-page-options="[5, 10, 25, 50, 100]" @request="onRequest"
    binary-state-sort :columns="columns" :table-style="
      'counter-reset: cssRowCounter ' +
      (pagination.page - 1) * pagination.rowsPerPage +
      ';'
    ">
    <template v-slot:body-cell-row-number>
      <q-td><span class="rowNumber" /> </q-td>
    </template>
  </q-table>
</template>

<script setup>
  import { ref, onMounted, defineProps } from "vue"
  import { fetchWrapper } from "../../helpers"

  const thisProps = defineProps({
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

  const pagination = ref({
    sortBy: thisProps.sortBy,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0
  })

  onMounted(() => {
    reloadData()
  })

  async function reloadData() {
    await loadData(pagination.value)
  }

  async function onRequest(props) {
    await loadData(props.pagination)
  }

  async function loadData(data) {
    loading.value = true
    await fetchWrapper
      .post(thisProps.dataSource, {
        pageSize: data.rowsPerPage,
        sortColumn: data.sortBy,
        sortOrder: data.descending ? 1 : 2,
        currentPage: data.page
        //columns: columns
      })
      .then((response) => {
        handleResponse(response, data)
      })
      .finally(() => {
        loading.value = false
      })
  }

  function handleResponse(response, data) {
    rows.value = response.data.items
    pagination.value.rowsNumber = response.data.page.totalItems
    pagination.value.rowsPerPage = response.data.page.pageSize
    pagination.value.page = response.data.page.currentPage
    pagination.value.sortBy = data.sortBy
    pagination.value.descending = data.descending
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