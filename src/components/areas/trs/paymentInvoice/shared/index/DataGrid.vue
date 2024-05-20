<template>
  <desktop
    :grid-store="gridStore"
    :data-source="dataSource"
    hide-filter-row
    hide-header
    flat
    bordered_
    separator="horizontal_"
    ref="desktopGrid"
    expandable_
  >
    <template #cell-no="{ item }">
      <span v-if="item.paymentId">
        <q-btn
          size="sm"
          dense
          round
          unelevated
          flat
          color="accent"
          icon="o_info"
          :to="`/trs/receipt/preview/${item.paymentId}`"
        ></q-btn>
        دریافت:
        {{ item.date.substring(0, 10) }}
      </span>
      <span v-else>
        <q-btn
          size="sm"
          dense
          round
          unelevated
          flat
          color="negative"
          icon="o_delete"
        ></q-btn>
        دریافت: تسویه حساب
      </span>
    </template>
    <template #cell-date="{ item }">
      {{ item.date.substring(0, 10) }}
    </template>
    <template #cell-amount="{ item }">
      {{ item.amount.toLocaleString() }}
    </template>
    <template #expand="{ item }">
      <div class="q-pa-md">
        <pre>{{ item }}</pre>
      </div>
    </template>
  </desktop>
  <!-- </template> -->
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { guidEmpty, sortOrder, sqlOperator } from "src/constants";
  import { paymentInvoiceColumns } from "src/components/areas/trs/_composables/constants";

  import Desktop from "src/components/shared/dataTables/desktop/DataGrid.vue";
  // import Mobile from "src/components/shared/dataTables/mobile/DataGrid.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    invoiceId: String,
  });

  const dataSource = "trs/paymentInvoice/getGridData";

  const gridStore = useBaseInfoGrid({
    columns: paymentInvoiceColumns,
    sortColumn: "date",
    sortOrder: sortOrder.descending,
    visibleColumns: ["no", "amount"],
    filterExpression: [
      {
        fieldName: "pi.InvoiceId",
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
