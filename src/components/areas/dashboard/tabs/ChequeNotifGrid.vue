<template>
  <data-grid
    :data-table-store="tableStore"
    class="border-radius-lg"
    expandable
    flat
    toolbar
    :title="title"
  >
    <template #cell-amount="{ item }">
      <div class="text-weight-500">
        {{ helper.formatNumber(item.amount) }}
      </div>
      <q-icon
        v-if="item.notifyCheck"
        size="24px"
        name="o_warning"
        color="warning"
      />
    </template>

    <template #expand="{ item }">
      <check-preview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import {
    date,
    customerName,
    subject,
    amount,
  } from "src/constants/columns";

  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import CheckPreview from "src/components/areas/trs/paymentItemCheck/shared/preview/IndexView.vue";

  const props = defineProps({
    filterExpression: Array,
    title: String,
  });

  const tableStore = useDataTable({
    dataSource: "trs/report/getCheckItemData",
    store: useBaseInfoGrid({
      columns: [
        {
          ...date,
          name: "itemDate",
          field: "itemDate",
          label: "تاریخ چک",
        },
        { ...customerName, style: "" },
        { ...subject },
        { ...amount, class: "text-weight-600" },
      ],
      sortColumn: "itemDate",
      filterExpression: props.filterExpression,
    }),
  });
</script>
