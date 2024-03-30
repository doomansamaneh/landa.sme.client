<template>
  <data-grid
    toolbar
    base-route="cmn/productUnitRelation"
    data-source="cmn/productUnitRelation/getGridData"
    :title="$t('main-menu-items.Cmn_ProductUnitRelation_View')"
    :columns="columns"
  >
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["title", "isActive", "actions"];
</script>
