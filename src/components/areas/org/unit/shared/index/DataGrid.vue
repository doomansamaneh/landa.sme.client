<template>
  <data-grid
    toolbar
    base-route="org/unit"
    data-source="org/unit/getGridData"
    :title="$t('main-menu-items.Org_Unit_View')"
    create-url="/org/unit/create"
    :grid-store="gridStore"
    activation
  ></data-grid>
</template>

<script setup>
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { unitColumns } from "src/components/areas/org/_composables/constants";

  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

  const gridStore = useBaseInfoGrid({
    columns: unitColumns,
    sortColumn: "code",
  });
</script>
