<template>
  <data-grid
    toolbar
    :base-route="baseRoute"
    :data-source="`${baseRoute}/getGridData`"
    :title="$t('main-menu-items.Inv_Producion_View')"
    :grid-store="gridStore"
    expandable
  >
    <template #expand="{ item }">
      <preview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { sortOrder } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { repositionColumns } from "../../../_composables/constants";

  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
  import Preview from "../preview/IndexView.vue";

  const baseRoute = "inv/production";
  const gridStore = useBaseInfoGrid({
    columns: repositionColumns,
    sortColumn: "date",
    sortOrder: sortOrder.descending,
  });
</script>
