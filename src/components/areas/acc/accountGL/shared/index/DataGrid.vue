<template>
  <data-grid
    toolbar
    base-route="acc/accountGL"
    data-source="acc/accountGL/getGridData"
    :title="$t('main-menu-items.Acc_AccountGL_View')"
    :grid-store="gridStore"
    create-url="/acc/accountGL/create"
    activation
  ></data-grid>
</template>

<script setup>
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { accountGLColumns } from "src/components/areas/acc/_composables/constants";

  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
  const gridStore = useBaseInfoGrid({
    columns: accountGLColumns,
    sortColumn: "code",
  });
</script>
