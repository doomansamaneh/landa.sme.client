<template>
  <data-grid
    toolbar
    base-route="trs/bankAccount"
    data-source="trs/bankAccount/getGridData"
    :title="$t('main-menu-items.Trs_BankAccount_View')"
    create-url="/trs/bankAccount/create"
    :grid-store="gridStore"
    expandable
    activation
  >
    <template #cell-debitRemained="{ item }">
      <span class="text-bold">
        {{ helper.formatNumber(item.debitRemained) }}
      </span>
    </template>

    <template #expand="{ item }">
      <preview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { bankAccountColumns } from "src/components/areas/trs/_composables/constants";
  import { helper } from "src/helpers";

  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
  import Preview from "../preview/IndexView.vue";

  const gridStore = useBaseInfoGrid({
    columns: bankAccountColumns,
    sortColumn: "bankTitle",
  });
</script>
