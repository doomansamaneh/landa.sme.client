<template>
  <data-grid
    toolbar
    base-route="cmn/currency"
    data-source="cmn/currency/getGridData"
    :title="$t('main-menu-items.Cmn_Currency_View')"
    :columns="columns"
  >
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["title", "isActive", "actions"];
</script>
