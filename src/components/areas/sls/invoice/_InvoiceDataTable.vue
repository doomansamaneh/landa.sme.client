<template>
  <div class="q-gutter-md q-mb-md">
    <q-btn
      class="bg-primary text-white text-caption"
      unelevated
      @click="dataTable.tableStore.exportCurrentPage()"
    >
      <q-icon
        name="download"
        class="q-mr-xs"
      />
      {{ $t("shared.labels.exportExcelCurrentPage") }}
    </q-btn>
    <q-btn
      class="bg-primary text-white text-caption"
      unelevated
      @click="dataTable.tableStore.exportAll()"
    >
      <q-icon
        name="download"
        class="q-mr-xs"
      />
      {{ $t("shared.labels.exportExcel") }}
    </q-btn>
  </div>
  <data-grid
    ref="dataTable"
    dataSource="sls/invoice/getGridData"
    :grid-store="invoiceStore"
    separator="horizontal"
    flat
    multiSelect
    numbered
    bordered
    dense_
    wrapCells
    expandable
  >
    <template #filter-statusTitle="{ col }">
      <q-select
        clearable
        clear-icon="clear"
        dense
        outlined
        emit-value
        v-model="col.value"
        :options="statusOptions"
        @update:model-value="dataTable?.reloadData"
      />
    </template>
    <template #cell-amount="{ item }">
      <span>{{ item.amount.toLocaleString() }}</span>
    </template>
    <template #cell-statusTitle="{ item }">
      <q-badge>{{ item.statusTitle }}</q-badge>
    </template>
    <template #detail="{ item }">
      <div>
        <h4>{{ item.no }}</h4>
        <pre>{{ item }}</pre>
      </div>
    </template>

    <template #footer-subtotal="{ selectedRows }">
      <td
        colspan="6"
        class="text-right"
      >
        {{ $t("shared.labels.selectedRows") }}
      </td>
      <td><b>{{ helper.getSubtotal(selectedRows, "amount").toLocaleString() }}</b></td>
      <td>
        <b>{{ helper.getSubtotal(selectedRows, "discountAmount").toLocaleString() }}</b>
      </td>
      <td colspan="100%"></td>
    </template>

    <template #footer-total="{ summary }">
      <td
        colspan="6"
        class="text-right"
      >
        {{ $t("shared.labels.total") }}
      </td>
      <td><b>{{ summary?.Amount.toLocaleString() }}</b></td>
      <td><b>{{ summary?.DiscountAmount.toLocaleString() }}</b></td>
      <td colspan="100%"></td>
    </template>
  </data-grid>
</template>

<script setup>
import { ref } from "vue"
import { statusOptions } from "src/constants"
import { helper } from "src/helpers"
import { useInvoice } from "../_composables/useInvoice"
import DataGrid from "src/components/shared/DataTables/DataGrid.vue"

const invoiceStore = useInvoice()
const dataTable = ref(null)

defineExpose({
  dataTable
})
</script>