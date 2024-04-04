<template>
  <!-- <template v-if="$q.screen.lt.sm">
    <mobile
      :title="title"
      :grid-store="gridStore"
      :data-source="dataSource"
      ref="mobileGrid"
    />
  </template>
  <template v-else> -->

  <desktop
    :title="title"
    :grid-store="gridStore"
    :data-source="dataSource"
    hide-filter-row
    flat
    bordered
    separator="horizontal"
    ref="desktopGrid"
    expandable
  >
    <template #cell-status="{ item }">
      <q-badge class="bg-primary">{{ item.status }}</q-badge>
    </template>
    <template #expand="{ item }">
      <div class="q-pa-md">
        <ul style="direction: ltr">
          <li><strong>tax id:</strong> {{ item.taxId }}</li>
          <li><strong>ref no:</strong> {{ item.referenceNumber }}</li>
          <li><strong>uid:</strong> {{ item.uid }}</li>
        </ul>
        <template v-if="item.data && JSON.parse(item.data)?.error.length">
          <h5 class="q-my-md">خطاها</h5>
          <ul>
            <li
              class="text-wrap"
              v-for="er in JSON.parse(item.data).error"
              :key="er.code"
            >
              {{ er.code }}: {{ er.msg }}
            </li>
          </ul>
        </template>
      </div>
    </template>
  </desktop>
  <!-- </template> -->
</template>

<script setup>
import { ref } from "vue";
import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
import { guidEmpty, sortOrder, sqlOperator } from "src/constants";
import { taxApiLogColumns } from "src/components/areas/sls/_composables/constants";

import Desktop from "src/components/shared/dataTables/desktop/DataGrid.vue";
// import Mobile from "src/components/shared/dataTables/mobile/DataGrid.vue";

const props = defineProps({
  toolbar: Boolean,
  title: String,
  invoiceId: String,
});

const dataSource = "sls/InvoiceTaxApiLog/getGridData";

const gridStore = useBaseInfoGrid({
  columns: taxApiLogColumns,
  sortColumn: "logTime",
  sortOrder: sortOrder.descending,
  filterExpression: [
    {
      fieldName: "il.InvoiceId",
      operator: sqlOperator.equal,
      value: props.invoiceId ?? guidEmpty,
    },
  ],
});
const desktopGrid = ref(null);
//const mobileGrid = ref(null);
</script>
<style>
.text-wrap {
  white-space: pre-line;
  word-wrap: break-word;
}
</style>
