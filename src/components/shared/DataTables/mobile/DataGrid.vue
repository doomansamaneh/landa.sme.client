<template>
  <q-card
    class="bordered"
    v-for="(row, index) in invoiceStore.state.rows.value"
    :key="index"
    :class="tableStore.getRowClass(row)"
    @click="selectCard(row)"
  >
    <q-card-section>
      <div class="row items-center justify-center">
        <q-btn
          round
          unelevated
          class="no-pointer-events bg-on-dark"
        >
          <q-avatar
            v-if="row.avatar"
            size="56px"
          >
            <img src="https://cdn.quasar.dev/img/avatar1.jpg">
          </q-avatar>

          <q-avatar
            size="56px"
            text-color="primary"
            v-else
          >
            <div class="char text-body1 text-bold">
              {{ helper.getFirstChar(row.customerName) }}
            </div>
          </q-avatar>
        </q-btn>
      </div>
      <div class="row justify-between items-center">

        <div class="col row items-center">
          <span class="text-caption text-on-dark">{{ row.dateString }}</span>
        </div>

        <div class="col row justify-end items-center q-gutter-xs">
          <span class="text-caption text-on-dark">
            شماره
          </span>
          <span class="text-caption text-on-dark">{{ row.no }}</span>
        </div>
      </div>
      <q-separator class="q-mt-xs" />
      <div class="row items-center q-py-md">
        <div class="col-10 row q-gutter-sm items-center">
          <q-btn
            dense
            padding="2px 12px"
            class="border-radius-sm bg-orange-2 no-pointer-events"
            unelevated
          >
            <span class="text-caption text-red">
              {{ row.statusTitle }}
            </span>
          </q-btn>

          <q-btn
            dense
            padding="2px 12px"
            class="border-radius-sm bg-primary no-pointer-events"
            unelevated
          >
            <span class="text-caption text-white">
              {{ row.typeTitle }}
            </span>
          </q-btn>

        </div>
        <div class="col">

          <div class="row justify-end q-gutter-sm items-center">

            <q-btn
              round
              dense
              class="text-on-dark"
              flat
              icon="o_chevron_left"
            />

          </div>

        </div>
      </div>
      <div class="column q-gutter-sm">

        <div class="row items-center border-radius-sm q-px-sm">

          <div class="col-3">
            <span class="text-caption text-on-dark">مشتری</span>
          </div>
          <div class="col">
            <span class="ellipsis-2-lines text-caption text-bold text-on-dark">{{ row.customerName }}</span>
          </div>
        </div>

        <div class="row items-center border-radius-sm q-px-sm">
          <div class="col-3">
            <span class="text-caption text-on-dark">شرح</span>
          </div>
          <div class="col">
            <span class="ellipsis-2-lines text-caption text-on-dark">{{ row.subject }}</span>
          </div>
        </div>

        <div class="row items-center border-radius-sm q-px-sm">
          <div class="col-3">
            <span class="text-caption text-on-dark">تخفیف</span>
          </div>
          <div class="col">
            <span class="ellipsis-2-lines text-caption text-on-dark">{{ row.discountAmount.toLocaleString() }}</span>
          </div>
        </div>

        <div class="row items-center border-radius-sm q-px-sm">

          <div class="col-3">
            <span class="text-caption text-on-dark">جمع کل</span>
          </div>
          <div class="col">
            <span class="ellipsis-2-lines text-caption text-bold text-on-dark">{{ row.amount.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <div
    v-if="!tableStore.showLoader.value && tableStore.rows.value.length == 0"
    class="q-table__bottom items-center q-table__bottom--nodata"
  >
    <slot name="noDataFound">
      <no-data-found />
    </slot>
  </div>

  <div
    class="row justify-center"
    v-if="hasMoreData"
  >
    <q-btn
      rounded
      unelevated
      @click="gotoNext"
      class="full-width primary-shadow bg-primary text-white"
    >
      <span class="text-body3">بارگزاری بیشتر</span>
    </q-btn>
  </div>

  <!-- <div
      v-if="tableStore.showPagebar.value"
      class="q-table__bottom"
    >
      <page-bar
        :pagination="tableStore.pagination.value"
        @page-changed="reloadData"
        sizeSeletion
      >
        <template #reload>
          <q-icon
            class="icon-hover dark-3 cursor-pointer q-pr-md"
            size="sm"
            name="o_refresh"
            @click="reloadData"
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
    </div> -->
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import PageBar from "src/components/shared/DataTables/PageBar.vue"
import NoDataFound from "src/components/shared/DataTables/NoDataFound.vue"
import { useDataTable } from "src/composables/useDataTable";
import { useInvoice } from "src/components/areas/crm/_composables/useInvoice"
import { helper } from "src/helpers"

const props = defineProps({
  store: Object,
  dataSource: String
})

const invoiceStore = useInvoice()
const tableStore = useDataTable(props.dataSource, props.store.columns, props.store)

function selectRow(row, checked) {
  tableStore.selectRow(row, checked)
  emitselectedRows()
}

function emitselectedRows() {
  // emit("selected-rows-changed", tableStore.selectedRows.value)
}

function setActiveRow(row) {
  tableStore.setActiveRow(row)
  // emit("active-row-changed", row)
}

function selectCard(row) {

  setActiveRow(row)
  selectRow(row, !row.selected)
}

async function gotoNext() {
  if (hasMoreData.value) {
    tableStore.pagination.value.currentPage++
    await reloadData()
  }
}

async function reloadData() {
  await tableStore.reloadData()
  invoiceStore.state.rows.value = [...invoiceStore.state.rows.value, ...tableStore.rows.value]
}

async function loadData() {
  tableStore.pagination.value.currentPage = 1
  await tableStore.reloadData()
  invoiceStore.state.rows.value = tableStore.rows.value
}

const hasMoreData = computed(() => {
  return tableStore.pagination.value.currentPage < tableStore.pagination.value.totalPages
});

onMounted(() => {
  loadData()
})

defineExpose({
  tableStore
})

</script>

<style lang="scss" scoped></style>

