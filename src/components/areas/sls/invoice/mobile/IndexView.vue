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

        </div>
      </div>
      <div class="col">

        <div class="row justify-end items-center">

          <div
            class="q-gutter-sm"
            v-if="!invoiceStore.state.activeRow?.value"
          >
            <q-badge
              outline
              :label="invoiceStore?.pagination.value.totalItems"
              class="bg-dark text-on-dark text-body2"
            />
            <span :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'">فاکتورهای فروش</span>
          </div>
          <!-- v-if="gridStore?.selectedCardIndex?.value?.length > 0" -->

          <div
            v-if="invoiceStore.state.activeRow?.value"
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
    <data-grid
      data-source="sls/invoice/getGridData"
      :store="invoiceStore"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import ToolBar from "src/components/shared/ToolBar.vue"
import DataGrid from "src/components/shared/DataTables/mobile/DataGrid.vue"
import { useInvoice } from "src/components/areas/sls/_composables/useInvoice"
import { sqlOperator } from "src/constants"

const invoiceStore = useInvoice()

</script>
