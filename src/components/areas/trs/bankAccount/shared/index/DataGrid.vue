<template>
  <data-grid
    toolbar
    base-route="trs/bankAccount"
    data-source="trs/bankAccount/getGridData"
    :title="$t('main-menu-items.Trs_BankAccount_View')"
    create-url="/trs/bankAccount/create"
    preview-page
    :grid-store="gridStore"
    expandable
    activation
  >
    <template #expand="{ item }">
      <preview
        :title="$t('main-menu-items.Trs_BankAccount_View')"
        :item="item"
        inside
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { bankAccountColumns } from "src/components/areas/trs/_composables/constants";

  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
  import Preview from "../preview/IndexView.vue";

  const gridStore = useBaseInfoGrid({
    columns: bankAccountColumns,
    sortColumn: "bankTitle",
  });
</script>
