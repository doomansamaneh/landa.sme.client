<template>
  <q-card class="card-table home no-shadow no-border">
    <q-card-section>
      <!-- <h4>پیش فاکتورها</h4> -->
      <grid
        dataSource="sls/quote/getGridData"
        :columns="columns"
        sortBy="no"
        class=""
      />
    </q-card-section>
    <!-- <q-card-section>
      <h4>فاکتورها</h4>
      <grid
        dataSource="sls/invoice/getGridData"
        :columns="columns"
        sortBy="no"
      />
    </q-card-section> -->
  </q-card>

  <!-- <div v-if="showTopBar">
    <top-bar />
  </div> -->
</template>

<script setup>
// import topBar from "src/components/management/quote/IndexView.vue"
// import grid from "src/components/shared/DataGrid.vue"
import grid from "src/components/shared/MyDataGrid.vue"
// import menuItems from "./TestView.vue"
import { useRouter } from "vue-router"
import { ref } from "vue"

const router = useRouter()

const showTopBar = true

const columns = [
  // {
  //   name: "index",
  //   label: "#",
  //   field: "index",
  //   align: "left",
  // },
  {
    name: "no",
    field: "no",
    sortable: true,
    label: "شماره",
    align: "left",
  },

  {
    name: "dateString",
    field: "dateString",
    sortable: true,
    label: "تاریخ",
    align: "left"
  },
  {
    name: "customerName",
    field: "customerName",
    sortable: true,
    label: "مشتری",
    align: "left"
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
  }
]

const gotoBusiness = () => {
  router.push("/business")
}
</script>
