<template>
  <data-grid
    toolbar
    base-route="acc/accountSL"
    data-source="acc/accountSL/getGridData"
    :title="$t('main-menu-items.Acc_AccountSL_View')"
    :grid-store="gridStore"
    create-url="/acc/accountSL/create"
  >
    <template #cell-code="{ item }">
      {{ item.code }}
      <small v-if="item.syncCode">({{ item.syncCode }})</small>
      <is-by-system :is-by-system="item.isBySystem" />
    </template>
  </data-grid>
</template>

<script setup>
import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
import { useAccountSLGrid } from "src/components/areas/acc/_composables/useAccountSLGrid";

import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
import IsBySystem from "src/components/shared/IsBySystem.vue";

const slStore = useAccountSLGrid();
const gridStore = useBaseInfoGrid({
  columns: slStore.columns,
  state: slStore.state,
  pagination: slStore.pagination,
});
</script>
