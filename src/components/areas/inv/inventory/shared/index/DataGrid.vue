<template>
  <data-grid
    toolbar
    base-route="inv/inventory"
    data-source="inv/inventory/getGridData"
    :title="$t('main-menu-items.Inv_Inventory_View')"
    :visible-columns="columns"
    activation
  ></data-grid>
</template>

<script setup>
  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

  const columns = ["code", "title", "isActive", "actions"];
</script>
