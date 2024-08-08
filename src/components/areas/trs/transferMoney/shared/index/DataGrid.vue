<template>
  <toolbar
    :title="$t('main-menu-items.Trs_TransferMoney_View')"
    :table-store="mobileGrid?.tableStore ?? desktopGrid?.tableStore"
    :base-route="baseRoute"
  />

  <q-card bordered>
    <q-card-section class="text-center">
      <h6 class="text-weight-700 no-letter-spacing">
        {{ $t("main-menu-items.Trs_TransferMoney_View") }}
      </h6>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-px-none">
      <data-grid
        ref="desktopGrid"
        :base-route="baseRoute"
        :data-source="`${baseRoute}/getGridData`"
        :title="$t('main-menu-items.Trs_TransferMoney_View')"
        create-url="`/${baseRoute}/create`"
        :grid-store="gridStore"
        flat
        toolbar
        multi-select
        numbered
        expandable
      >
        <template #cell-amount="{ item }">
          <span class="text-weight-700">
            {{ item.amount?.toLocaleString() }}
          </span>
        </template>

        <template #footer-subtotal="{ selectedRows }">
          <td :colspan="colspan" class="text-right">
            {{ $t("shared.labels.selectedRows") }}
          </td>
          <td>
            <b>
              {{
                helper
                  .getSubtotal(selectedRows, "amount")
                  .toLocaleString()
              }}
            </b>
          </td>
          <td colspan="100%"></td>
        </template>

        <template #footer-total="{ summary }">
          <td :colspan="colspan" class="text-right">
            {{ $t("shared.labels.total") }}
          </td>
          <td>
            <b>{{ summary?.amount?.toLocaleString() }}</b>
          </td>
          <td></td>
        </template>

        <template #expand="{ item }">
          <preview :item="item" inside />
        </template>
      </data-grid>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";

  import { helper } from "src/helpers";
  import { sortOrder } from "src/constants";
  import { useBaseInfoGrid } from "components/areas/_shared/_composables/useBaseInfoGrid";
  import { transferMoneyColumns } from "components/areas/trs/_composables/constants";

  import Toolbar from "src/components/areas/_shared/baseInfo/shared/index/BaseInfoToolbar.vue";
  import DataGrid from "components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "../preview/IndexView.vue";

  const desktopGrid = ref(null);
  const baseRoute = "trs/transferMoney";
  const gridStore = useBaseInfoGrid({
    columns: transferMoneyColumns,
    sortColumn: "date",
    sortOrder: sortOrder.descending,
  });

  const colspan = computed(
    () =>
      transferMoneyColumns.findIndex(
        (column) => column.name === "amount"
      ) +
      1 + //numbered column
      1 //multi check column
  );
</script>
