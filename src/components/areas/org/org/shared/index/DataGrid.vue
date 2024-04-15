<template>
  <data-grid
    toolbar
    base-route="org/org"
    data-source="org/org/getGridData"
    :title="$t('main-menu-items.Org_Org_View')"
    :visible-columns="columns"
  >
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["title", "isActive"];
</script>
