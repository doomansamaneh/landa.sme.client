<template>
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
    <template #cell-logTime="{ item }">
      <div>{{ item.logTime }}</div>
      <div>{{ item.taxId }}</div>
    </template>
    <template #cell-status="{ item }">
      <q-badge class="primary-gradient">{{ item.status }}</q-badge>
    </template>
    <template #cell-actions="{ item }">
      <q-btn
        v-if="
          item.status === taxStatus.pending ||
          item.status === taxStatus.notFound ||
          item.status === taxStatus.inProgress
        "
        @click="
          taxStore.inquery(item.id, desktopGrid.tableStore.reloadData)
        "
        flat
        size="sm"
        padding="sm"
        icon="o_refresh"
      >
        <q-tooltip
          class="custom-tooltip text-body1 no-letter-spacing"
        >
          دریافت دوباره اطلاعات از سامانه مودیان
        </q-tooltip>
      </q-btn>
    </template>

    <template #expand="{ item }">
      <div class="q-pa-md">
        <ul style="direction: ltr">
          <li>
            <strong>tax id:</strong>
            {{ item.taxId }}
          </li>
          <li>
            <strong>ref no:</strong>
            {{ item.referenceNumber }}
          </li>
          <li>
            <strong>uid:</strong>
            {{ item.uid }}
          </li>
        </ul>
        <template v-if="item.errors?.length">
          <h5 class="q-my-md">خطاها</h5>
          <ul>
            <li
              class="text-wrap"
              v-for="er in item.errors"
              :key="er.code"
            >
              {{ er.code }}: {{ er.msg }}{{ er.message }}
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
  import { taxStatus } from "src/components/areas/sls/_composables/constants";
  import { taxApiLogColumns } from "src/components/areas/sls/_composables/constants";
  import { useTaxApiLogModel } from "src/components/areas/sls/_composables/useTaxApiLogModel";

  import Desktop from "src/components/shared/dataTables/desktop/DataGrid.vue";
  // import Mobile from "src/components/shared/dataTables/mobile/DataGrid.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    invoiceId: String,
  });

  const dataSource = "sls/InvoiceTaxApiLog/getGridData";
  const taxStore = useTaxApiLogModel();

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

  defineExpose({
    dataGrid: desktopGrid,
  });
</script>
<style>
  .text-wrap {
    white-space: pre-line;
    word-wrap: break-word;
  }
</style>
