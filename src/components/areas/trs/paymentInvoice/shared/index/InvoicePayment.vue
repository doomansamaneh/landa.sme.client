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
      <span v-if="item.paymentId">
        <q-btn
          size="sm"
          dense
          round
          unelevated
          flat
          color="accent"
          icon="o_info"
          :to="`/${detailUrl}/preview/${item.paymentId}`"
        />
        {{ $t("shared.subSystem.receiptAndPayment") }}:
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
          @click="formStore.deleteById(item.id, reloadData)"
        />
        {{ $t("shared.labels.settlement") }}: {{ item.comment }}
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
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { sortOrder, sqlOperator } from "src/constants";
  import { paymentInvoiceColumns } from "src/components/areas/trs/_composables/constants";
  import { useFormActions } from "src/composables/useFormActions";

  import Desktop from "src/components/shared/dataTables/desktop/DataGrid.vue";
  // import Mobile from "src/components/shared/dataTables/mobile/DataGrid.vue";

  const props = defineProps({
    invoiceId: String,
    detailUrl: String,
  });

  const desktopGrid = ref(null);
  //const mobileGrid = ref(null);

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
        value: props.invoiceId,
      },
    ],
  });

  async function reloadData() {
    await desktopGrid.value.tableStore.reloadData();
  }
  const formStore = useFormActions("trs/paymentInvoice");
  defineExpose({
    reloadData,
    dataGrid: desktopGrid,
  });
</script>
