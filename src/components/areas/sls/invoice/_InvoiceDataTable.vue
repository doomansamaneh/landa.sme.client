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
    :dataSource="dataSource ?? 'sls/invoice/getGridData'"
    :grid-store="gridStore"
    :columns="columns"
    separator="horizontal"
    flat
    multiSelect
    numbered
    bordered
    dense_
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
    <template #cell-discountAmount="{ item }">
      <span>{{ item.discountAmount.toLocaleString() }}</span>
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
      <td v-if="showDiscount">
        <b>{{ summary?.discountAmount?.toLocaleString() }}</b>
      </td>
      <td colspan="100%"></td>
    </template>
  </data-grid>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { statusOptions } from "src/constants"
import { helper } from "src/helpers"

import DataGrid from "src/components/shared/DataTables/Desktop/DataGrid.vue"
import CustomInput from "src/components/shared/Forms/CustomInput.vue"
import CustomSelect from "src/components/shared/Forms/CustomSelect.vue"
import InvoicePreview from "src/components/areas/sls/invoice/InvoicePreview.vue"

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
