<template>
  <q-table
    class="text-left"
    :card-class="color"
    hide-pagination
    icon-first-page="search"
    card="blue"
    color="primary"
    selection="multiple"
    :selected-rows-label="getSelectedString"
    flat
    :loading="loading"
    :rows="rows"
    title="پیش فاکتورها"
    v-model:selected="selected"
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

    <template v-slot:bottom>
      <div class="row justify-between items-center q-gutter-x-lg">
        <div class="">
          <span>۱ - ۱۰ از ۴۵۰</span>
        </div>
        <div class="">
          <q-pagination
            direction-links
            max="5"
            v-model="current"
            boundary-links
            icon-first="keyboard_double_arrow_left"
            icon-last="keyboard_double_arrow_right"
            icon-prev="chevron_left"
            icon-next="chevron_right"
            gutter="xs"
            padding="3px 2px 1px 2px"
            round
            color="grey-8"
            active-color="primary"
            size="14px"
            class="pagination"
          />
        </div>
      </div>
      <td>
        <div class="row justify-end items-center q-gutter-x-md q-py-md">
          <q-select
            dense
            outlined
            :options="[5, 10, 20]"
            @update:model-value="handlePageChange"
            transition-show="flip-up"
            transition-hide="flip-down"
            popup-content-class="text-caption text-weight-medium text-grey-8"
            class="select"
          />
          <span>ردیف در هر صفحه</span>
        </div>
      </td>
      <!-- <div class="row items-center justify-between">
            <div class="">
            <span>۱ - ۱۰ از ۴۵۰</span>
          </div>
          <div class="row justify-between q-py-md">
            <q-pagination
              direction-links
              max="5"
              boundary-links
              icon-first="keyboard_double_arrow_left"
              icon-last="keyboard_double_arrow_right"
              icon-prev="chevron_left"
              icon-next="chevron_right"
              gutter="xs"
              padding="3px 2px 1px 2px"
              round
              color="grey-8"
              active-color="primary"
              size="14px"
              class="pagination"
            />
          </div>
          <div class="row justify-end items-center q-gutter-x-md q-py-md">
            <q-select
              dense
              outlined
              :options="[5, 10, 20]"
              @update:model-value="handlePageChange"
              transition-show="flip-up"
              transition-hide="flip-down"
              popup-content-class="text-caption text-weight-medium text-grey-8"
              class="select"
            />
            <span>ردیف در هر صفحه</span>
          </div>
          </div> -->
    </template>
    <template v-slot:top-row>
      <q-tr>
        <q-th colspan="">
          <q-icon name="search" size="42px" color="primary" />
        </q-th>
        <q-th>
          <q-input outlined dense class="q-py-sm" />
        </q-th>
        <q-th>
          <q-input outlined dense class="q-py-sm" />
        </q-th>
        <q-th>
          <q-input outlined dense class="q-py-sm" />
        </q-th>
        <q-th>
          <q-input outlined dense class="q-py-sm" />
        </q-th>
        <q-th>
          <q-input outlined dense class="q-py-sm" />
        </q-th>
        <q-th>
          <q-input outlined dense class="q-py-sm" />
        </q-th>
        <q-th>
          <q-input outlined dense class="q-py-sm" />
        </q-th>
        <q-th>
          <q-input outlined dense class="q-py-sm" />
        </q-th>
      </q-tr>
    </template>

    <template v-slot:bottom-row>
      <tr class="subtotal text-bold">
        <td class="no-hover"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colspan=""></td>
        <td colspan=""></td>
        <td></td>
        <td></td>
      </tr>
      <tr class="total text-white text-bold">
        <td class="no-hover"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colspan="">266,460,000</td>
        <td colspan="">800,000</td>
        <td></td>
        <td></td>
      </tr>
    </template>

    <template v-slot:body-cell-statusTitle="props">
      <q-td :props="props">
        <q-badge color="orange" :label="props.value" />
      </q-td>
    </template>
    <template v-slot:body-cell-typeTitle="props">
      <q-td :props="props">
        <q-badge class="text" outline :label="props.value" />
      </q-td>
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
const current = ref(1)
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

function getSelectedString() {
  return selected.value.length === 0
    ? ""
    : `${selected.value.length} record${
        selected.value.length > 1 ? "s" : ""
      } selected of ${rows.value.length}`
}
</script>

<style>
.rowNumber::before {
  counter-increment: cssRowCounter;
  content: counter(cssRowCounter) ". ";
}

.select {
  width: 75px;
}

.q-table__bottom {
  display: flex;
  justify-content: space-between;
}
</style>
