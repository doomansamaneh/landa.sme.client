<template>
  <data-grid
    toolbar
    base-route="doc/contract"
    data-source="doc/contract/getGridData"
    :title="$t('main-menu-items.Doc_Contract_View')"
    :visible-columns="columns"
  >
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["title", "isActive", "actions"];
</script>
