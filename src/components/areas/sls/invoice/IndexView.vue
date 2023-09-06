<template>
  <div style="margin: 32px;">
    <span class="text-h5">فاکتورها</span>
  </div>

  <div style="margin: 0px 89px;">
    <advanced-search
      :gridStore="gridStore"
      @apply-search="applySearch"
    />
  </div>

  <div style="margin:0px 89px;">
    <div class="q-gutter-md q-py-lg">
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
          <old-grid
            ref="gridI1"
            dataSource="sls/invoice/getGridData"
            :gridStore="gridStore"
            sortColumn="no"
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
                :options="gridStore.statusOptions"
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
              <td><b>{{ summary.Amount.toLocaleString() }}</b></td>
              <td><b>{{ summary.DiscountAmount.toLocaleString() }}</b></td>
              <td colspan="100%"></td>
            </template>
          </old-grid>
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
import OldGrid from "src/components/shared/DataTables/DataGridCustom.vue"
import advancedSearch from "./AdvancedSearch.vue"
import gridV2 from "./IndexViewV2.vue"
import { useInvoice } from "../_composables/invoiceStore"

const gridStore = useInvoice()

const gridI1 = ref(null)
const tab = ref('invoice')

function rowChanged(row) {
  //alert('row changed')
}

function selectedRowsChanged(selectedRows) {
  //console.log(selectedRows)
  //alert('selectedRows changed')
}

async function applySearch(model) {
  await gridI1.value.reloadData()
  //await gridI2.value.reloadData()
}
</script>