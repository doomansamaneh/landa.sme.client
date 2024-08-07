<template>
  {{ desktopGrid?.tableStore?.colums }}
  <desktop-toolbar
    :table-store="desktopGrid?.tableStore"
    :base-route="baseRoute"
  />

  <desktop-grid
    ref="desktopGrid"
    :base-route="baseRoute"
    data-source="prl/wage/getGridData"
    :create-url="`/${baseRoute}/create`"
    :grid-store="gridStore"
  >
    <template #cell-amount="{ item }">
      {{ item.amount?.toLocaleString() }}
    </template>
    <template #cell-taxAmount="{ item }">
      {{ item.taxAmount?.toLocaleString() }}
    </template>
    <template #cell-insurranceAmount="{ item }">
      {{ item.insurranceAmount?.toLocaleString() }}
    </template>
  </desktop-grid>
</template>

<script setup>
  import { ref } from "vue";
  import { sortOrder } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { wageColumns } from "src/components/areas/prl/_composables/constants";

  import DesktopGrid from "../../desktop/index/DataGrid.vue";
  import DesktopToolbar from "../../desktop/index/ToolBar.vue";

  const gridStore = useBaseInfoGrid({
    columns: wageColumns,
    sortColumn: "month",
    sortOrder: sortOrder.ascending,
  });

  const desktopGrid = ref(null);
  const baseRoute = "prl/wage";
</script>
