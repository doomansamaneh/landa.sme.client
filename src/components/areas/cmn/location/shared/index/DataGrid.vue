<template>
  <data-grid
    toolbar
    base-route="cmn/location"
    data-source="cmn/location/getGridData"
    :title="$t('main-menu-items.Cmn_Location_View')"
    :columns="columns"
  >
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["code", "title", "isActive", "actions"];
</script>
