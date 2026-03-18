<template>
  <data-grid
    toolbar
    base-route="scr/ipRange"
    data-source="scr/ipRange/getGridData"
    :title="$t('main-menu-items.Scr_IpRange_View')"
    :columns="ipRangeColumns"
    sort-column="userName"
    create-url="/scr/ipRange/create"
    activation
  ></data-grid>
</template>

<script setup>
  import { ipRangeColumns } from "../../../_composables/constants";
  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
</script>
