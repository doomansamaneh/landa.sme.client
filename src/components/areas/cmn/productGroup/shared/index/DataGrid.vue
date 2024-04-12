<template>
  <data-grid
    toolbar
    base-route="cmn/productGroup"
    data-source="cmn/productGroup/getGridData"
    :title="$t('main-menu-items.Cmn_ProductGroup_View')"
    :visible-columns="columns"
    sort-column="code"
    create-url="/cmn/productGroup/create"
  >
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["code", "title", "isActive", "actions"];
</script>
