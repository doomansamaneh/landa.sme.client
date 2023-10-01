<template>
  <q-card
    class="q-ma-lg"
    bordered
    flat_
  >
    <q-card-section class="bg-blue text-white">
      <span class="text-h6">فاکتورها</span>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-none">
      <data-grid
        ref="dataTable"
        class="q-mt-lg_"
        dataSource="sls/invoice/getGridData"
        :grid-store="invoiceStore"
        sortColumn="no"
        expandable
        multi-select
        wrap-cells
        flat
      >
        <template #cell-amount="{ item }">
          <span>{{ item.amount.toLocaleString() }}</span>
        </template>
        <template #cell-subject="{ item }">
          <span>{{ item.subject }}</span>
          <div v-if="item.summary">summary: {{ item.summary }}</div>
          <div class="q-gutter-xs">
            <q-badge v-if="item.typeTitle">{{ item.typeTitle }}</q-badge>
            <q-badge v-if="item.contractTitle">{{ item.contractTitle }}</q-badge>
            <q-badge>قرارداد شماره یک</q-badge>
            <q-badge>بازاریاب شماره دو</q-badge>
          </div>
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
            colspan="5"
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
          <td colspan="100%">
            <pre>{{ summary }}</pre>
          </td>
        </template>
      </data-grid>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue"
import DataGrid from "src/components/shared/DataTables/DataGrid.vue"
import { useInvoice } from "../_composables/useInvoice"

const invoiceStore = useInvoice()

const dataTable = ref(null)

defineExpose({
  dataTable
})

</script>