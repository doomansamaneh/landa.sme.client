<template>
  <data-grid
    ref="dataTable"
    :dataSource="dataSource ?? 'sls/invoice/getGridData'"
    :grid-store="gridStore"
    :columns="columns"
    separator="horizontal"
    flat
    multiSelect
    numbered
    bordered
    dense
    wrapCells
    expandable
  >
    <!-- <template #filter-amount="{ col }">
      <custom-input
        v-model="col.value"
        display-format="n0"
        debounce="500"
        @keyup.enter="reloadData"
        @update:model-value="reloadData"
      />
    </template> -->

    <template #filter-statusTitle="{ col }">
      <custom-select
        v-model="col.value"
        :options="statusOptions"
        @update:model-value="reloadData"
      />
      <!-- <q-select
        clearable
        clear-icon="clear"
        dense
        outlined
        emit-value
        v-model="col.value"
        :options="statusOptions"
        @update:model-value="dataTable?.reloadData"
      /> -->
    </template>
    <template #cell-amount="{ item }">
      <span>{{ item.amount.toLocaleString() }}</span>
    </template>
    <template #cell-payedAmount="{ item }">
      <span>{{ item.payedAmount.toLocaleString() }}</span>
    </template>
    <template #cell-remainedAmount="{ item }">
      <span>{{ item.remainedAmount.toLocaleString() }}</span>
    </template>
    <template #cell-discountAmount="{ item }">
      <span>{{ item.discountAmount.toLocaleString() }}</span>
    </template>
    <template #cell-subject="{ item }">
      <div>{{ item.subject }}</div>
      <div
        v-if="item.summary"
        class="text-caption-sm"
      >
        {{ item.summary }}
      </div>
      <div class="q-gutter-x-sm">
        <q-badge>{{ item.typeTitle }}</q-badge>
        <q-badge v-if="item.contractTitle">{{ item.contractTitle }}</q-badge>
      </div>
    </template>
    <template #cell-statusTitle="{ item }">
      <q-badge>{{ item.statusTitle }}</q-badge>
    </template>
    <template #detail="{ item }">
      <div class="q-pa-md">
        <invoice-preview :item="item" />
      </div>
    </template>

    <template #footer-subtotal="{ selectedRows }">
      <td
        :colspan="colspan"
        class="text-right"
      >
        {{ $t("shared.labels.selectedRows") }}
      </td>
      <td><b>{{ helper.getSubtotal(selectedRows, "amount").toLocaleString() }}</b></td>
      <td v-if="showDiscount">
        <b>{{ helper.getSubtotal(selectedRows, "discountAmount").toLocaleString() }}</b>
      </td>
      <td><b>{{ helper.getSubtotal(selectedRows, "payedAmount").toLocaleString() }}</b></td>
      <td><b>{{ helper.getSubtotal(selectedRows, "remainedAmount").toLocaleString() }}</b></td>
      <td colspan="100%"></td>
    </template>

    <template #footer-total="{ summary }">
      <td
        :colspan="colspan"
        class="text-right"
      >
        {{ $t("shared.labels.total") }}
      </td>
      <td><b>{{ summary?.amount?.toLocaleString() }}</b></td>
      <td><b>{{ summary?.payedAmount?.toLocaleString() }}</b></td>
      <td><b>{{ summary?.remainedAmount?.toLocaleString() }}</b></td>
      <td v-if="showDiscount">
        <b>{{ summary?.discountAmount?.toLocaleString() }}</b>
      </td>
      <td colspan="100%"></td>
    </template>
  </data-grid>
</template>

<script setup>
import { ref, computed } from "vue"
import { statusOptions } from "src/constants"
import { helper } from "src/helpers"

import DataGrid from "components/shared/dataTables/desktop/DataGrid.vue"
import CustomSelect from "components/shared/forms/CustomSelect.vue"
import InvoicePreview from "components/areas/sls/invoice/shared/detail/InvoicePreview.vue"

const props = defineProps({
  dataSource: String,
  columns: Array,
  gridStore: Object,
})

const dataTable = ref(null)

const colspan = computed(() =>
  dataTable.value?.tableStore?.columns.value.findIndex(column => column.name === "amount")
  + 1//numbered column
  + 1//multi check column
)

const showDiscount = computed(() =>
  dataTable.value?.tableStore?.columns.value.findIndex(column => column.name === "discountAmount") >= 0
)

async function reloadData() {
  await dataTable.value?.tableStore.reloadData()
}

defineExpose({
  dataTable
})
</script>
