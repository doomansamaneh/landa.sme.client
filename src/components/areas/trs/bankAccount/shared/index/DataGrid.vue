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
    <template #expand="{ item }">
      <desktop-preview
        v-if="$q.screen.gt.sm"
        :title="$t('main-menu-items.Trs_BankAccount_View')"
        :item="item"
        inside
      />
      <mobile-preview
        v-else
        :title="$t('main-menu-items.Trs_BankAccount_View')"
        :item="item"
        inside
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { bankAccountColumns } from "src/components/areas/trs/_composables/constants";

  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
  import DesktopPreview from "../../desktop/IndexView.vue";
  import MobilePreview from "../../mobile/IndexView.vue";

  const $q = useQuasar();
  const gridStore = useBaseInfoGrid({
    columns: bankAccountColumns,
    sortColumn: "bankTitle",
  });
</script>
