<template>
  <data-grid
    toolbar
    base-route="cmn/bankBranch"
    data-source="cmn/bankBranch/getGridData"
    :title="$t('main-menu-items.Cmn_BankBranch_View')"
    :grid-store="gridStore"
  >
  </data-grid>
</template>

<script setup>
import { bankBranchColumns } from "components/areas/cmn/_composables/constants";
import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";

import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
const gridStore = useBaseInfoGrid({
  columns: bankBranchColumns,
  sortColumn: "bankTitle",
});
</script>
