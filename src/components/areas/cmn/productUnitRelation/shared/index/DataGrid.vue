<template>
  <data-grid
    toolbar
    base-route="cmn/productUnitRelation"
    data-source="cmn/productUnitRelation/getGridData"
    :title="$t('main-menu-items.Cmn_ProductUnitRelation_View')"
    :grid-store="gridStore"
  >
    <template #cell-rate="{ item }">
      {{ helper.formatNumber(item.rate) }}
    </template>
  </data-grid>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { productUnitRelationColumns } from "components/areas/cmn/_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";

  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

  const gridStore = useBaseInfoGrid({
    columns: productUnitRelationColumns,
    sortColumn: "masterUnitTitle",
  });
</script>
