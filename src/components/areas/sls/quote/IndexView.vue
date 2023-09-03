<template>
  <!-- <q-card class="card-table home no-shadow no-border">
    <q-card-section v-if="false">
      <grid
        dataSource="sls/invoice/getGridData"
        :columns="columns"
        sortBy="no"
        class=""
      />
    </q-card-section>
    <q-card-section>
     
    </q-card-section>
  </q-card> -->

  <div style="margin: 32px;">
    <span class="text-h6">پیش فاکتورها</span>
  </div>

  <old-grid
    style="margin: 56px;"
    dataSource="sls/quote/getGridData"
    :columns="columns"
    sortColumn="no"
    separator="none"
    flat
    numbered
    bordered
    square_
    grid_
    dense
    wrapCells
    expandable
  >
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
    flat
  >
    <q-card-section>
      <span class="text-h6">پیش فاکتورها</span>
    </q-card-section>
    <q-card-section>
      <old-grid
        dataSource="sls/quote/getGridData"
        :columns="columns"
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
    </q-card-section>
  </q-card>

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
        class="q-mt-lg_"
        dataSource="sls/invoice/getGridData"
        :columns="columns"
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
// import topBar from "src/components/management/quote/IndexView.vue"
import OldGrid from "src/components/shared/DataTables/DataGridCustom.vue"
import grid from "src/components/shared/DataTables/MyDataGrid.vue"
// import menuItems from "./TestView.vue"
import { useRouter } from "vue-router"
import { ref } from "vue"

const router = useRouter()

const showTopBar = true

const columns = ref([
  {
    name: "no",
    field: "no",
    showFilter: true,
    sortable: false,
    label: "شماره",
    class: "text-left",
    cellClass: "text-left",
    cellStyle: "",
    style: "width:100px;",
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
    style: "width:100px;"
  }
  // {
  //   name: "statusTitle",
  //   align: "left"
  // }
])

const gotoBusiness = () => {
  router.push("/business")
}
</script>
