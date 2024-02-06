<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :title="title"
    base-route="/sls/invoice"
    activation
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

  <div style="margin: 54px 0 32px 0;">
    <advanced-search
      :grid-store="invoiceStore"
      @apply-search="applySearch"
    />
  </div>

  <div class="bordered_">
    <!-- <div class="row items-center q-gutter-md">
      <q-btn
        v-if="gridI1?.activeRow != null"
        flat
        class="bg-primary text-white"
        no-caps
      >
        edit (invoice no: {{ gridI1?.activeRow.no }})
      </q-btn>
      <div>
        <q-btn
          v-if="gridI1?.selectedRows.length > 0"
          flat
          class="bg-secondary text-white"
          no-caps
        >
          delete all ({{ gridI1?.selectedRows.length }} rows selected)
        </q-btn>
      </div>
    </div> -->

    <q-tabs
      v-model="tab"
      class="border-radius-xs bg-primary text-white q-mt-xl"
      indicator-color="white"
      align="left"
      inline-label
      narrow-indicator
      @update:model-value="tabChanged"
    >

      <!-- <q-tabs
      v-model="tab"
      inline-label
      align="left"
      class="bg-dark text-grey"
      narrow-indicator
    > -->
      <q-tab
        name="invoice"
        label="فاکتورهای فروش"
        icon="check"
        class="text-on-dark_"
      />
      <q-tab
        name="canceled"
        label="ابطال شده"
        icon="o_cancel"
        class="text-on-dark_"
      />
    </q-tabs>

    <q-tab-panels
      class="bordered border-radius-xs q-mt-md"
      v-model="tab"
      animated
    >
      <q-tab-panel name="invoice">
        <invoice-grid
          ref="invoiceTable"
          :grid-store="invoiceStore"
        />
      </q-tab-panel>

      <q-tab-panel name="canceled">
        <invoice-grid
          ref="canceledInvoiceTable"
          :grid-store="canceledInvoiceStore"
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>

  <div v-if="false">
    <template v-if="gridI1?.allSelectedIds.length > 0">
      <h4>all selected ids: {{ gridI1?.allSelectedIds.length }}</h4>
      <pre>{{ gridI1?.allSelectedIds }}</pre>
    </template>

    <template v-if="gridI1?.selectedRows.length > 0">
      <h4>selected rows: {{ gridI1?.selectedRows.length }}</h4>
      <pre>{{ gridI1?.selectedRows }}</pre>
    </template>

    <template v-if="gridI1?.activeRow != null">
      <h4>active row</h4>
      <pre>{{ gridI1?.activeRow }}</pre>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useInvoiceGrid } from "src/components/areas/sls/_composables/useInvoiceGrid"
import { sqlOperator } from "src/constants"

import InvoiceGrid from "src/components/areas/sls/invoice/_InvoiceDataTable.vue"
import AdvancedSearch from "src/components/areas/sls/invoice/_AdvancedSearch.vue"
import ToolBar from "src/components/shared/ToolBar.vue"

const invoiceStore = useInvoiceGrid([{
  fieldName: "d.StatusId",
  operator: sqlOperator.notEqual,
  value: "a36af633-d0bb-4857-a542-364e12658d1c"
}])

const canceledInvoiceStore = useInvoiceGrid([{
  fieldName: "d.StatusId",
  operator: sqlOperator.equal,
  value: "a36af633-d0bb-4857-a542-364e12658d1c"
}])

const invoiceTable = ref(null)
const canceledInvoiceTable = ref(null)

const tab = ref('invoice')

const tableStore = computed(() => invoiceTable.value?.dataTable?.tableStore ?? canceledInvoiceTable.value?.dataTable?.tableStore)

function tabChanged() {
  invoiceStore.state.firstLoad.value = false
  canceledInvoiceStore.state.firstLoad.value = false
}

async function applySearch(model) {
  await tableStore.value?.reloadData()
}
</script>
