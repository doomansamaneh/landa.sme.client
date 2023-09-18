<template>
  <div class="">
    <q-page-sticky
      class="q-py-md z-top bg-main q-px-xl q-py-lg"
      position="top"
      expand
    >
      <q-toolbar>
        <q-toobar-title>
          <span class="text-h5 q-mr-xl">فاکتورها</span>
        </q-toobar-title>
        <div class="q-gutter-x-md">
          <q-btn
          class="btn q-py-sm q-px-md bg-primary text-white"
          size="12px"
          rounded
          unelevated
        ><q-icon
            name="o_add"
            class="q-mr-sm"
          />ایجاد</q-btn>
        <q-btn
          class="btn q-py-sm q-px-md"
          outline
          rounded
          size="12px"
        ><q-icon
            name="o_edit"
            class="q-mr-sm"
          />ویرایش</q-btn>
        <q-btn
          class="btn q-py-sm q-px-md"
          outline
          rounded
          size="12px"
        ><q-icon
            name="o_delete"
            class="q-mr-sm"
          />حذف</q-btn>
        <q-btn
          class="btn q-py-sm q-px-md"
          outline
          size="12px"
          rounded
        ><q-icon
            name="more_horiz"
            class="q-mr-sm"
          />بیشتر</q-btn>
        </div>
      </q-toolbar>
    </q-page-sticky>
  </div>

  <div style="margin: 100px 48px 0 48px;">
    <advanced-search
      :grid-store="invoiceStore"
      @apply-search="applySearch"
    />
  </div>

  <div class="q-mx-xl">
    <div class="q-gutter-md">
      <q-btn
        v-if="gridI1?.activeRow != null"
        flat
        class="bg-blue-5 text-white"
        no-caps
      >
        edit (invoice no: {{ gridI1?.activeRow.no }})
      </q-btn>

      <q-btn
        v-if="gridI1?.selectedRows.length > 0"
        flat
        class="bg-blue-9 text-white"
        no-caps
      >
        delete all ({{ gridI1?.selectedRows.length }} rows selected)
      </q-btn>
    </div>

    <div>
      <q-tabs
        v-model="tab"
        dense
        inline-label
        align="left"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
      >
        <q-tab
          name="invoice"
          label="فاکتورهای فروش"
          icon="check"
        />
        <q-tab
          name="canceled"
          label="ابطال شده"
          icon="cancel"
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

const invoiceStore = useInvoice()
const invoiceTable = ref(null)

const tab = ref('invoice')

const gridI1 = computed(() => invoiceTable.value?.dataTable)

async function applySearch(model) {
  await gridI1?.value.reloadData()
  //await gridI2.value.reloadData()
}
</script>
