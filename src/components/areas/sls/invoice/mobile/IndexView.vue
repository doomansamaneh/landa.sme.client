<template>
  <q-page-sticky
    class="z-1 bg-main"
    position="top"
    expand
  >
    <q-toolbar
      class="q-py-sm text-on-dark rtl"
      :style="$q.screen.gt.sm ? 'padding-left: 38px; padding-right: 38px;' : 'padding-left: 24px; padding-right: 24px;'"
    >
      <div class="col-3">
        <div class="row items-center justify-between">
          <q-btn
            class="no-padding"
            flat
            @click="$router.go(-1)"
          >
            <q-icon
              name="arrow_back"
              size="sm"
            />
          </q-btn>

          <span class="text-body1 text-bold">{{ gridStore.selectedCardIndex.value.length }}</span>

        </div>
      </div>
      <div class="col">

        <div class="row justify-end items-center">

          <div class="row items-center" v-if="!gridStore.selectedCardIndex.value.length">
            <q-badge
              rounded
              outline
              :label="gridStore?.items?.value?.length"
              class="q-mr-sm bg-dark text-on-dark text-body2"
            />
            <span :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'">فاکتورهای فروش</span>
          </div>

          <div
            v-if="gridStore?.selectedCardIndex?.value?.length > 0"
            class="row items-center q-gutter-x-sm"
          >
            <q-btn
              dense
              round
              flat
            >
              <q-icon
                name="o_delete"
                size="sm"
              />
            </q-btn>

            <q-btn
              dense
              round
              flat
            >
              <q-icon
                name="o_edit"
                size="sm"
              />
            </q-btn>

            <q-btn
              dense
              round
              flat
            >
              <q-icon
                name="o_add"
                size="sm"
              />
            </q-btn>

          </div>

        </div>


      </div>

    </q-toolbar>
  </q-page-sticky>
  <div
    class="colunm q-gutter-lg"
    style="margin-top: 38px;"
  >
    <data-grid />
  </div>
</template>

<script setup>
import ToolBar from "src/components/shared/ToolBar.vue"
import dataGrid from "src/components/shared/DataTables/mobile/DataGrid.vue"
import { computed, ref } from "vue"
import { useInvoice } from "src/components/areas/sls/_composables/useInvoice"
import { sqlOperator } from "src/constants"

import { useDataTable } from "src/composables/mobile/useDataTable";

const gridStore = useDataTable()

const invoiceStore = useInvoice([{
  fieldName: "d.StatusId",
  operator: sqlOperator.notEqual,
  value: "a36af633-d0bb-4857-a542-364e12658d1c"
}])

const canceledInvoiceStore = useInvoice([{
  fieldName: "d.StatusId",
  operator: sqlOperator.equal,
  value: "a36af633-d0bb-4857-a542-364e12658d1c"
}])

const invoiceTable = ref(null)
const canceledInvoiceTable = ref(null)

const tableStore = computed(() => invoiceTable.value?.dataTable?.tableStore ?? canceledInvoiceTable.value?.dataTable?.tableStore)


</script>
