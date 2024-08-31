<template>
  <data-grid
    toolbar
    base-route="trs/payment"
    data-source="trs/payment/getGridData"
    :title="$t('main-menu-items.Trs_Payment_View')"
    create-url="/trs/payment/create"
    :grid-store="gridStore"
    expandable
  >
    <template #cell-amount="{ item }">
      <span class="text-weight-700">
        {{ helper.formatNumber(item.amount) }}
      </span>
    </template>
    <template #expand="{ item }">
      <preview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { sortOrder } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { receiptColumns } from "src/components/areas/trs/_composables/constants";
  import { helper } from "src/helpers";

  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
  import Preview from "../preview/IndexView.vue";

  const gridStore = useBaseInfoGrid({
    columns: receiptColumns,
    sortColumn: "date",
    sortOrder: sortOrder.descending,
  });
</script>
