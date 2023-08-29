<template>
  <q-card class="card-table home no-shadow no-border">
    <q-card-section v-if="false">
      <grid
        dataSource="sls/quote/getGridData"
        :columns="columns"
        sortBy="no"
        class=""
      />
    </q-card-section>
    <q-card-section>
      <h4>فاکتورها</h4>
      <old-grid
        dataSource="sls/invoice/getGridData"
        :columns="columns"
        sortColumn="no"
        expandable="true"
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

  <!-- <div v-if="showTopBar">
    <top-bar />
  </div> -->
</template>

<script setup>
// import topBar from "src/components/management/quote/IndexView.vue"
import OldGrid from "src/components/shared/DataGridCustom.vue"
import grid from "src/components/shared/MyDataGrid.vue"
// import menuItems from "./TestView.vue"
import { useRouter } from "vue-router"
import { ref } from "vue"

const router = useRouter()

const showTopBar = true

const columns = ref([
  {
    name: "index",
    field: "index",
    label: "#",
    class: "",
    style: ""
  },
  // {
  //   name: "multiple-selection",
  //   field: "multiple-selection",
  //   label: "",
  //   align: "left"
  // },
  {
    name: "i.no",
    field: "no",
    showFilter: true,
    sortable: true,
    label: "شماره",
    class: "",
    cellClass: "bg-blue text-white text-center",
    cellStyle: "",
    value: ""
  },
  {
    name: "date",
    field: "dateString",
    sortable: true,
    label: "تاریخ",
  },
  {
    name: "c.name",
    field: "customerName",
    sortable: true,
    label: "مشتری",
    style: "width: 240px; color: red;",
    template: "<div></div>",
    showFilter: true,
    value: ""
  },
  {
    name: "subject",
    field: "subject",
    sortable: true,
    label: "شرح",
    align: "left"
  },
  {
    name: "amount",
    field: "amount",
    sortable: true,
    label: "جمع کل",
    align: "left"
  },
  {
    name: "discountAmount",
    field: "discountAmount",
    sortable: true,
    label: "تخفیف",
    align: "left"
  },
  {
    name: "typeTitle",
    field: "typeTitle",
    sortable: true,
    label: "نوع",
    align: "left"
  },
  {
    name: "statusTitle",
    field: "statusTitle",
    sortable: true,
    label: "وضعیت",
    align: "left"
  },
  // {
  //   name: "statusTitle",
  //   align: "left"
  // }
])

const gotoBusiness = () => {
  router.push("/business")
}
</script>
