<template>
  <data-grid
    data-source="acc/accountCL/getGridData"
    :title="$t('main-menu-items.Acc_AccountCL_View')"
    :visible-columns="columns"
    sort-column="code"
  ></data-grid>
</template>

<script setup>
  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

  const columns = ["code", "title", "isActive"];
</script>
