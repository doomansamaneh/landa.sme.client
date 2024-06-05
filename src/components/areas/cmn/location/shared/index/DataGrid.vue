<template>
  <data-grid
    toolbar
    base-route="cmn/location"
    data-source="cmn/location/getGridData"
    :title="$t('main-menu-items.Cmn_Location_View')"
    :visible-columns="columns"
    activation
  ></data-grid>
</template>

<script setup>
  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

  const columns = ["code", "title", "isActive", "actions"];
</script>
