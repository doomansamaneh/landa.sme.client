<template>
  <data-grid
    :data-source="dataSource"
    :grid-store="gridStore"
    numbered
    hideFilterRow
    expandable
  >
    <template #cell-date="{ item }">
      {{ item.date?.substring(0, 10) }}
    </template>
    <template #expandable="{ item }">
      <q-btn
        size="md"
        :color="$q.dark.isActive ? 'white' : 'grey-8'"
        flat
        dense
        round
        icon="chevron_left"
        :to="`/acc/voucher/preview/${item.id}`"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { paymentItemColumns } from "../../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";

  const props = defineProps({
    model: Object,
  });

  const dataSource = `trs/paymentItemCheck/GetPaymentItemData/${props.model.id}`;
  const filterExpression = [];
  const gridStore = useBaseInfoGrid({
    columns: paymentItemColumns,
    filterExpression: filterExpression,
    sortColumn: "no",
  });
</script>
