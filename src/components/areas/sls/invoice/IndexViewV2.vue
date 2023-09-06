<template>
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
</template>

<script setup>
import { computed, ref } from "vue"
import OldGrid from "src/components/shared/DataTables/DataGridCustom.vue"

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

const gridI2 = ref(null)

</script>