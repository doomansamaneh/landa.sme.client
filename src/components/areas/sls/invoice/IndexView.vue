<template>
  <div style="margin: 32px;">
    <span class="text-h5">فاکتورها</span>
  </div>

  <div style="margin: 56px;">
    <advanced-search
      ref="adSearch"
      @apply-search="applySearch"
    />
  </div>

  <old-grid
    ref="gridI1"
    style="margin: 56px;"
    dataSource="sls/invoice/getGridData"
    :columns="columns"
    :advancedSearch="adSearch"
    sortColumn="no"
    separator="horizontal"
    flat
    numbered
    bordered
    square_
    grid_
    dense
    wrapCells
    expandable
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
        {{ item.customerName }}
      </div>
    </template>
  </old-grid>

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
import { useRouter } from "vue-router"
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

async function applySearch(model) {
  gridI1.value.setSearchModel(model)
  gridI2.value.setSearchModel(model)
  await gridI1.value.reloadData()
  await gridI2.value.reloadData()
}
</script>
