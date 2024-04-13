<template>
  <data-grid
    toolbar
    base-route="acc/accountCL"
    data-source="acc/accountCL/getGridData"
    :title="$t('main-menu-items.Acc_AccountCL_View')"
    :visible-columns="columns"
    sort-column="code"
    create-url="/acc/accountCL/create"
  >
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
import IsBySystem from "src/components/shared/IsBySystem.vue";

const columns = ["code", "title", "isActive", "actions"];
</script>
