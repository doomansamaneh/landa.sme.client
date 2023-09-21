<template>
  <top-bar title="فاکتورها" />
  <div>
    <advanced-search
      class="q-mt-lg"
      :grid-store="invoiceStore"
      @apply-search="applySearch"
    />
  </div>

  <div>
    <div class="row items-center q-gutter-md q-my-md">
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
    </div>

    <q-tabs
      v-model="tab"
      inline-label
      align="left"
      class="bg-dark text-grey"
      narrow-indicator
    >
      <q-tab
        name="invoice"
        label="فاکتورهای فروش"
        icon="check"
        class="text-on-dark"
      />
      <q-tab
        name="canceled"
        label="ابطال شده"
        icon="o_cancel"
        class="text-red"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel name="invoice">
        <invoice ref="invoiceTable" />
      </q-tab-panel>

      <q-tab-panel name="canceled">
        <grid-v2 />
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
import { useInvoice } from "../_composables/useInvoice"
import Invoice from "./_InvoiceDataTable.vue"
import AdvancedSearch from "./_AdvancedSearch.vue"
import GridV2 from "./IndexViewV2.vue"
import TopBar from "src/components/shared/ToolBar.vue"

const invoiceStore = useInvoice()
const invoiceTable = ref(null)

const tab = ref('invoice')

const gridI1 = computed(() => invoiceTable.value?.dataTable)

async function applySearch(model) {
  await gridI1?.value.reloadData()
  //await gridI2.value.reloadData()
}
</script>
