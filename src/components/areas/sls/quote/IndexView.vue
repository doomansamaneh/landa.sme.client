<template>
  <q-card>
    <q-btn icon="arrow_back" @click="gotoBusiness">کسب و کارها</q-btn>
    <q-card-section>
      <menu-items />
    </q-card-section>
    <q-card-section>
      <h4>پیش فاکتورها</h4>
      <grid dataSource="sls/quote/getGridData" :columns="columns" sortBy="no" />
    </q-card-section>
    <q-card-section>
      <h4>فاکتورها</h4>
      <grid
        dataSource="sls/invoice/getGridData"
        :columns="columns"
        sortBy="no"
      />
    </q-card-section>
  </q-card>

  <div v-if="showIndex">
    <index />
  </div>
</template>

<script setup>
import Index from "src/components/management/proforma/IndexView.vue"
import grid from "src/components/shared/DataGrid.vue"
import menuItems from "./TestView.vue"

import { useRouter } from "vue-router"

const router = useRouter()

const showIndex = false

const columns = [
  { name: "no", field: "no", sortable: true, label: "شماره" },
  { name: "date", field: "date", sortable: true, label: "تاریخ" },
  {
    name: "customerName",
    field: "customerName",
    sortable: true,
    label: "مشتری"
  },
  { name: "subject", field: "subject", sortable: true, label: "شرح" },
  { name: "amount", field: "amount", sortable: true, label: "جمع کل" }
  //{ name: "subject", field: "subject", sortable: true, label: "شرح" }
  //{ name: "typeTitle", field: "typeTitle", sortable: true, label: "نوع" },
  //{ name: "statusTitle", field: "statusTitle", sortable: true, label: "وضعیت" }
]

const gotoBusiness = () => {
  router.push("/business")
}
</script>
