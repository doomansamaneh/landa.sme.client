<template>
  <data-grid
    toolbar
    base-route="cmn/commonKeyword"
    data-source="cmn/commonKeyword/getGridData"
    :title="$t('main-menu-items.Cmn_CommonKeyword_View')"
    :columns="columns"
    create-url="/cmn/commonKeyword/create"
  />
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["title", "actions"];
</script>
