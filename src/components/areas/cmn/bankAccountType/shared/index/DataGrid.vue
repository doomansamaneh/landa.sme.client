<template>
  <data-grid
    toolbar
    base-route="cmn/bankAccountType"
    data-source="cmn/bankAccountType/getGridData"
    :title="$t('main-menu-items.Cmn_BankAccountType_View')"
    :visible-columns="columns"
  >
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["title", "isActive", "actions"];
</script>
