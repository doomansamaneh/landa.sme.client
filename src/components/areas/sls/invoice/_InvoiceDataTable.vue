<template>
  <data-grid
    ref="dataTable"
    dataSource="sls/invoice/getGridData"
    :grid-store="invoiceStore"
    separator="horizontal"
    flat
    multiSelect
    numbered
    bordered
    dense
    wrapCells
    expandable
  >
    <template #filter_statusTitle="{ col }">
      <q-select
        clearable
        dense
        outlined
        emit-value
        v-model="col.value"
        :options="statusOptions"
        @update:model-value="dataTable?.reloadData"
      />
    </template>
    <template #cell_amount="{ item }">
      <span>{{ item.amount.toLocaleString() }}</span>
    </template>
    <template #cell_statusTitle="{ item }">
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
        انتخاب شده
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
        جمع کل
      </td>
      <td><b>{{ summary?.Amount.toLocaleString() }}</b></td>
      <td><b>{{ summary?.DiscountAmount.toLocaleString() }}</b></td>
      <td colspan="100%">
      </td>
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