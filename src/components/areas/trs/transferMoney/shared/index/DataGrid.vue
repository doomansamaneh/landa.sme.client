<template>
  <data-grid
    toolbar
    base-route="trs/transferMoney"
    data-source="trs/transferMoney/getGridData"
    :title="$t('main-menu-items.Trs_TransferMoney_View')"
    create-url="/trs/transferMoney/create"
    :grid-store="gridStore"
    expandable
  >
    <template #cell-amount="{ item }">
      <span class="text-weight-700">
        {{ item.amount?.toLocaleString() }}
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
  import { transferMoneyColumns } from "src/components/areas/trs/_composables/constants";

  import Preview from "../preview/IndexView.vue";

  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
  const gridStore = useBaseInfoGrid({
    columns: transferMoneyColumns,
    sortColumn: "date",
    sortOrder: sortOrder.descending,
  });
</script>
