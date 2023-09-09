<template>
  <data-grid
    ref="gridI1"
    dataSource="sls/invoice/getGridData"
    :grid-store="invoiceStore"
    separator="horizontal"
    flat
    multiSelect
    numbered
    bordered
    square_
    grid_
    dense
    wrapCells
    expandable
    @active-row-changed="rowChanged"
    @selectedRows-changed="selectedRowsChanged"
  >
    <template #filter_statusTitle="{ col }">
      <q-select
        clearable
        dense
        outlined
        emit-value
        v-model="col.value"
        :options="invoiceStore.statusOptions"
        @update:model-value="gridI1?.reloadData"
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
      <td><b>{{ selectedRows.reduce((sum, item) => { return sum + item.amount }, 0).toLocaleString() }}</b></td>
      <td>
        <b>{{ selectedRows.reduce((sum, item) => { return sum + item.discountAmount }, 0).toLocaleString() }}</b>
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
import { computed, ref } from "vue"
import DataGrid from "src/components/shared/DataTables/DataGrid.vue"
const dataTable = ref(null)

function rowChanged(row) {
  //alert('row changed')
}

function selectedRowsChanged(selectedRows) {
  //console.log(selectedRows)
  //alert('selectedRows changed')
}

defineExpose({
  dataTable
})
</script>