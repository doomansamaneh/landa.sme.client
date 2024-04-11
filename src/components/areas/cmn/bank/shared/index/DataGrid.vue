<template>
  <data-grid
    toolbar
    base-route="cmn/bank"
    data-source="cmn/bank/getGridData"
    :title="$t('main-menu-items.Cmn_Bank_View')"
    :visible-columns="columns"
    create-url="/cmn/bank/create"
  >
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["title", "isActive", "actions"];
</script>
