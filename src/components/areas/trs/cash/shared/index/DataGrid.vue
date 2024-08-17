<template>
  <data-grid
    toolbar
    base-route="trs/cash"
    data-source="trs/cash/getGridData"
    :title="$t('main-menu-items.Trs_Cash_View')"
    :grid-store="gridStore"
    create-url="/trs/cash/create"
    expandable
    activation
  >
    <template #cell-debitRemained="{ item }">
      <span class="text-bold">
        {{ helper.formatNumber(item.debitRemained) }}
      </span>
    </template>

    <template #expand="{ item }">
      <preview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { cashColumns } from "src/components/areas/trs/_composables/constants";

  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
  import Preview from "../preview/IndexView.vue";
  import { helper } from "src/helpers";

  const gridStore = useBaseInfoGrid({
    columns: cashColumns,
    sortColumn: "title",
  });
</script>
