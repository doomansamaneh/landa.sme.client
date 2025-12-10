<template>
  <data-grid
    toolbar
    base-route="cmn/documentTemplate"
    data-source="cmn/documentTemplate/getGridData"
    :title="$t('main-menu-items.Cmn_DocumentTemplate_View')"
    :visible-columns="columns"
    activation
  ></data-grid>
</template>

<script setup>
  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

  const columns = ["title", "isActive", "actions"];
</script>
