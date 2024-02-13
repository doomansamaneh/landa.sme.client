<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :title="title"
    base-route="/sls/invoice"
  >
    <template #buttons-batch-action>
      <q-btn
        class="bordered-btn_bg-dark text-caption"
        rounded
        unelevated
        no-caps
        @click="editBatch"
      >
        <q-icon
          name="o_edit"
          class="q-mr-xs"
        />
        {{ $t("shared.labels.editBatch") }} ({{ selectedIds?.length }} rows)
      </q-btn>
    </template>
  </tool-bar>

  <div>
    <advanced-search
      :grid-store="invoiceStore"
      @apply-search="reloadData"
    />
  </div>

  <div class="q-py-md">
    <q-tabs
      v-model="tab"
      class="border-radius-xs bg-primary text-white q-mb-md"
      align="left"
      inline-label
      narrow-indicator
      @update:model-value="tabChanged"
    >

      <q-tab
        name="invoice"
        label="فاکتورهای فروش"
        icon="check"
      />
      <q-tab
        name="canceled"
        label="ابطال شده"
        icon="o_cancel"
      />
    </q-tabs>

    <invoice-grid
      ref="invoiceTable"
      :grid-store="invoiceStore"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue"
import { useInvoiceGrid } from "components/areas/sls/_composables/useInvoiceGrid"
import { sqlOperator, cancelStatus } from "src/constants"
import { bus } from "src/helpers"

import InvoiceGrid from "components/areas/sls/invoice/desktop/index/_DataTable.vue"
import AdvancedSearch from "components/areas/sls/invoice/desktop/index/_AdvancedSearch.vue"
import ToolBar from "components/shared/ToolBar.vue"

const invoiceStore = useInvoiceGrid([{
  fieldName: "d.StatusId",
  operator: sqlOperator.notEqual,
  value: cancelStatus
}])

const invoiceTable = ref(null)

const tab = ref('invoice')

const tableStore = computed(() => invoiceTable.value?.dataTable?.tableStore)

async function tabChanged(e) {
  if (e === "canceled") {
    tableStore.value.state.value.filterExpression = [{
      fieldName: "d.StatusId",
      operator: sqlOperator.equal,
      value: cancelStatus
    }]
  }
  else {
    tableStore.value.state.value.filterExpression = [{
      fieldName: "d.StatusId",
      operator: sqlOperator.notEqual,
      value: cancelStatus
    }]
  }
  await reloadData()
}

async function reloadData(model) {
  await tableStore.value?.reloadData()
}

onMounted(() => {
  bus.on('render-page', handleRender);
})

onUnmounted(() => {
  bus.off('render-page', handleRender);
})

async function handleRender() {
  await tableStore.value?.loadData()
}
</script>
