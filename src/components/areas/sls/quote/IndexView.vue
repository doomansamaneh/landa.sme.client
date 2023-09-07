<template>
  <q-btn @click="testStore.increamentLocal">increament local</q-btn>
  <q-btn @click="testStore.increamentGlobal">increament global</q-btn>
  <h4>{{ testStore.localCount }}</h4>
  <h4>{{ testStore.globalCount }}</h4>
  <div style="margin: 32px">
    <span class="text-h5">پیش فاکتورها</span>
  </div>
  <div style="margin: 48px; max-width: 400px">
    <h4>test select events</h4>
    <q-select
      dense
      outlined
      emit-value
      v-model="statusTitle"
      :options="statusOptions"
      @update:model-value="handleSelect"
    />
    <q-select
      class="q-mt-lg"
      dense
      outlined
      emit-value
      @update:model-value="handleSelect"
      :options="statusOptions"
      v-model="statusTitle"
    />
  </div>

  <data-grid
    ref="gridQ1"
    style="margin: 56px"
    dataSource="sls/quote/getGridData"
    :columns="columns"
    sortColumn="no"
    separator="horizontal"
    flat
    numbered
    multi-select
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
        @update:model-value="gridQ1?.reloadData"
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
  </data-grid>

  <!-- <div v-if="showTopBar">
    <top-bar />
  </div> -->
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
// import topBar from "src/components/management/quote/IndexView.vue"
import DataGrid from "src/components/shared/DataTables/DataGrid.vue"

const router = useRouter()
const testStore = useTest()

const showTopBar = true
const statusTitle = ref("")

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
    value: ""
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
  // {
  //   name: "statusTitle",
  //   align: "left"
  // }
])

const gridQ1 = ref(null)

const statusOptions = [
  {
    label: "دائم",
    value: "دائم"
  },
  {
    label: "موقت",
    value: "موقت"
  },
  {
    label: "ابطال شده",
    value: "ابطال شده"
  }
]

function handleSelect(val) {
  alert(`filter changed 1: ${val}`)
  alert(`filter changed 12: ${statusTitle.value}`)
}
</script>
