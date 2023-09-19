<template>
  <top-bar title="فاکتورها" />
  <div style="margin: 84px 60px 0 60px;">
    <advanced-search
      :grid-store="invoiceStore"
      @apply-search="applySearch"
    />
  </div>

  <div style="margin: 0 60px 0 60px">
    <div class="q-gutter-md">
      <q-btn
        v-if="gridI1?.activeRow != null"
        flat
        class="bg-blue-5 text-white"
        no-caps
      >
        edit (invoice no: {{ gridI1?.activeRow.no }})
      </q-btn>

      <div class="q-mb-lg">
        <q-btn
          v-if="gridI1?.selectedRows.length > 0"
          flat
          class="bg-blue-9 text-white"
          no-caps
        >
          delete all ({{ gridI1?.selectedRows.length }} rows selected)
        </q-btn>
      </div>
    </div>

    <div>
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

    <div class="q-pa-lg">
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
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useInvoice } from "../_composables/useInvoice"
import Invoice from "./_InvoiceDataTable.vue"
import AdvancedSearch from "./_AdvancedSearch.vue"
import GridV2 from "./IndexViewV2.vue"
import TopBar from "src/components/shared/TopBar.vue"

const invoiceStore = useInvoice()
const invoiceTable = ref(null)

const tab = ref('invoice')

const gridI1 = computed(() => invoiceTable.value?.dataTable)

async function applySearch(model) {
  await gridI1?.value.reloadData()
  //await gridI2.value.reloadData()
}
</script>
