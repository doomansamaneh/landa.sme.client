<template>
  <data-grid
    toolbar
    base-route="doc/contract"
    data-source="doc/contract/getGridData"
    :title="$t('main-menu-items.Doc_Contract_View')"
    :grid-store="gridStore"
    expandable
  >
    <template #cell-income="{ item }">
      {{ item.income.toLocaleString() }}
    </template>
    <template #cell-expense="{ item }">
      {{ item.expense.toLocaleString() }}
    </template>
    <template #cell-netIncome="{ item }">
      {{ item.netIncome.toLocaleString() }}
    </template>
  </data-grid>
</template>

<script setup>
import { useBaseInfoGrid } from "components/areas/_shared/_composables/useBaseInfoGrid";
import { contractColumns } from "components/areas/doc/_composables/constants";

import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const gridStore = useBaseInfoGrid({ columns: contractColumns });
</script>
