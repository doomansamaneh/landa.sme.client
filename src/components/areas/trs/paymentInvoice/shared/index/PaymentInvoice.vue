<template>
  <desktop
    :grid-store="gridStore"
    :data-source="dataSource"
    :filte
    hide-filter-row
    hide-header
    flat
    bordered_
    separator="horizontal_"
    ref="desktopGrid"
    expandable_
  >
    <template #cell-no="{ item }">
      <span v-if="item.invoiceId">
        <q-btn
          size="sm"
          dense
          round
          unelevated
          flat
          color="accent"
          icon="o_info"
          :to="`/${getInvoiceUrl(item)}/preview/${item.invoiceId}`"
        />
        فاکتور شماره:
        <span class="q-px-sm">
          {{ item.no }} -
          {{ item.date.substring(0, 10) }}
        </span>
      </span>
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
  import {
    documentType,
    sortOrder,
    sqlOperator,
  } from "src/constants";
  import { paymentInvoiceColumns } from "src/components/areas/trs/_composables/constants";

  import Desktop from "src/components/shared/dataTables/desktop/DataGrid.vue";
  // import Mobile from "src/components/shared/dataTables/mobile/DataGrid.vue";

  const props = defineProps({
    paymentId: String,
  });

  const desktopGrid = ref(null);
  //const mobileGrid = ref(null);

  const getFilterExpression = () => {
    return [
      {
        fieldName: "pi.PaymentId",
        operator: sqlOperator.equal,
        value: props.paymentId,
      },
    ];
  };
  const dataSource = "trs/paymentInvoice/getGridData";

  const gridStore = useBaseInfoGrid({
    columns: paymentInvoiceColumns,
    sortColumn: "date",
    sortOrder: sortOrder.descending,
    visibleColumns: ["no", "amount"],
    filterExpression: getFilterExpression(),
  });

  const getInvoiceUrl = (item) => {
    return item.invoiceTypeId === documentType.purchase
      ? "sls/purhcase"
      : item.invoiceTypeId === documentType.salesReturn
      ? "sls/salesReturn"
      : "sls/invoice";
  };
</script>
<style>
  .text-wrap {
    white-space: pre-line;
    word-wrap: break-word;
  }
</style>
