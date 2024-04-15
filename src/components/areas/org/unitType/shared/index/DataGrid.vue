<template>
  <data-grid
    toolbar
    base-route="org/unitType"
    data-source="org/unitType/getGridData"
    :title="$t('main-menu-items.Org_UnitType_View')"
    :visible-columns="columns"
    create-url="/org/unitType/create"
  >
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["title", "isActive", "actions"];
</script>
