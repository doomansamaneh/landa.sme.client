<template>
  <div style="margin: 32px;">
    <span class="text-h5">فاکتورها</span>
  </div>

  <div style="margin: 89px;">
    <advanced-search
      ref="adSearch"
      @apply-search="applySearch"
    />
  </div>

  <div
    class="q-pt-lg"
    style="margin: 89px;"
  >
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
    <old-grid
      ref="gridI1"
      dataSource="sls/invoice/getGridData"
      :columns="columns"
      :advancedSearch="adSearch"
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
          :options="statusOptions"
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
        <td><b>{{ selectedRows.reduce((sum, item) => { return sum + item.discountAmount }, 0).toLocaleString() }}</b></td>
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

  <q-card
    class="q-ma-lg"
    bordered
    flat_
  >
    <q-card-section class="bg-blue text-white">
      <span class="text-h6">فاکتورها</span>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <old-grid
        ref="gridI2"
        class="q-mt-lg_"
        dataSource="sls/invoice/getGridData"
        :columns="columns"
        :advancedSearch="adSearch"
        sortColumn="no"
        flat
      >
        <template #cell_amount="{ item }">
          <span>{{ item.amount.toLocaleString() }}</span>
        </template>
        <template #cell_subject="{ item }">
          <span>{{ item.subject }}</span>
          <div v-if="item.summary">summary: {{ item.summary }}</div>
          <div class="q-gutter-xs">
            <q-badge v-if="item.typeTitle">{{ item.typeTitle }}</q-badge>
            <q-badge v-if="item.contractTitle">{{ item.contractTitle }}</q-badge>
            <q-badge>قرارداد شماره یک</q-badge>
            <q-badge>بازاریاب شماره دو</q-badge>
          </div>
        </template>
        <template #cell_statusTitle="{ item }">
          <q-badge>{{ item.statusTitle }}</q-badge>
        </template>
        <template #detail="{ item }">
          <div>
            <h4>{{ item.no }}</h4>
            {{ item.customerName }}
          </div>
        </template>
      </old-grid>
    </q-card-section>
  </q-card>
  <!-- <div v-if="showTopBar">
    <top-bar />
  </div> -->
</template>

<script setup>
import { ref } from "vue"
import OldGrid from "src/components/shared/DataTables/DataGridCustom.vue"
import advancedSearch from "./AdvancedSearch.vue"

const columns = ref([
  {
    name: "no",
    field: "no",
    sortable: false,
    label: "شماره",
    class: "text-left",
    cellClass: "text-left",
    cellStyle: "",
    style: "width:100px;",
    showFilter: true,
    operator: 1,
    value: "",
  },
  {
    name: "date",
    field: "dateString",
    sortable: true,
    label: "تاریخ",
    class: "text-left",
    showFilter: true
  },
  {
    name: "customerName",
    field: "customerName",
    sortable: true,
    label: "مشتری",
    style: "",
    template: "<div></div>",
    showFilter: true,
    class: "text-left",
    value: ""
  },
  {
    name: "subject",
    field: "subject",
    sortable: true,
    label: "شرح",
    align: "left",
    class: "text-left",
    showFilter: true,
    style: "width:20%"
  },
  {
    name: "amount",
    field: "amount",
    sortable: true,
    label: "جمع کل",
    align: "left",
    class: "text-left",
    showFilter: true
  },
  {
    name: "discountAmount",
    field: "discountAmount",
    sortable: true,
    label: "تخفیف",
    align: "left",
    class: "text-left",
    showFilter: true
  },
  {
    name: "typeTitle",
    field: "typeTitle",
    sortable: true,
    label: "نوع",
    align: "left",
    class: "text-left",
    showFilter: true
  },
  {
    name: "statusTitle",
    field: "statusTitle",
    sortable: true,
    label: "وضعیت",
    align: "left",
    class: "text-left",
    showFilter: true,
    style: "width:100px;",
    value: ""
  }
])

const adSearch = ref(null)
const gridI1 = ref(null)
const gridI2 = ref(null)

const statusOptions = [{
  label: 'دائم',
  value: 'دائم'
},
{
  label: 'موقت',
  value: 'موقت'
},
{
  label: 'ابطال شده',
  value: 'ابطال شده',
}
]


function rowChanged(row) {
  //alert('row changed')
}

function selectedRowsChanged(selectedRows) {
  //console.log(selectedRows)
  //alert('selectedRows changed')
}

async function applySearch(model) {
  gridI1.value.setSearchModel(model)
  gridI2.value.setSearchModel(model)
  await gridI1.value.reloadData()
  await gridI2.value.reloadData()
}
</script>