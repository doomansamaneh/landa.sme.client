<template>
  <data-grid
    toolbar
    base-route="cmn/bankBranch"
    data-source="cmn/bankBranch/getGridData"
    :title="$t('main-menu-items.Cmn_BankBranch_View')"
    :columns="columns"
  >
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["code", "title", "isActive", "actions"];
</script>
