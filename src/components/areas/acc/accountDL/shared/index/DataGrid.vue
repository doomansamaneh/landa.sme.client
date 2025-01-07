<template>
  <data-grid
    toolbar
    base-route="acc/accountDL"
    data-source="acc/accountDL/getGridData"
    :title="$t('main-menu-items.Acc_AccountDL_View')"
    :grid-store="gridStore"
    create-url="/acc/accountGL/create"
    activation
  ></data-grid>
</template>

<script setup>
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { accountDLColumns } from "src/components/areas/acc/_composables/constants";

  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
  const gridStore = useBaseInfoGrid({
    columns: accountDLColumns,
    sortColumn: "code",
  });
</script>
