<template>
  <toolbar-desktop
    :table-store="desktopGrid?.tableStore"
    :crud-store="crudStore"
    :title="$t('main-menu-items.Prl_Wage_View')"
    :base-route="baseRoute"
    buttons
    margin
  >
    <template #bootons-edit="{ row }">
      <q-btn
        padding="6px 12px"
        :to="`/${baseRoute}/edit/${row.id}`"
        class="text-body2 no-letter-spacing"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-sm" />
        {{ $t("shared.labels.edit") }}
      </q-btn>

      <q-btn
        padding="6px 12px"
        :to="`/${baseRoute}/copy/${row.id}`"
        class="text-body2 no-letter-spacing"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_copy" class="q-mr-sm" />
        {{ $t("shared.labels.copy") }}
      </q-btn>
    </template>

    <template #buttons-custom="{ row }">
      <q-item v-if="row" clickable v-close-popup tabindex="0">
        <q-item-section avatar class="q-py-sm">
          <q-avatar class="bg-on-dark" size="sm">
            <q-icon name="o_save" size="20px" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.downloadInsurrance") }}
          </div>
        </q-item-section>
      </q-item>

      <q-item v-if="row" clickable v-close-popup tabindex="0">
        <q-item-section avatar class="q-py-sm">
          <q-avatar class="bg-on-dark" size="sm">
            <q-icon name="o_save" size="20px" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.downloadTax") }}
          </div>
        </q-item-section>
      </q-item>

      <q-separator class="q-my-sm" />

      <q-item clickable v-close-popup tabindex="0">
        <q-item-section avatar class="q-py-sm">
          <q-avatar class="bg-on-dark" size="sm">
            <q-icon name="o_print" size="20px" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.print") }}
          </div>
        </q-item-section>
      </q-item>
    </template>
  </toolbar-desktop>

  <data-grid
    ref="desktopGrid"
    base-route="baseRoute"
    data-source="prl/wage/getGridData"
    :title="$t('main-menu-items.Prl_Wage_View')"
    :create-url="`/${baseRoute}/create`"
    :grid-store="gridStore"
    expandable
  >
    <template #cell-amount="{ item }">
      {{ item.amount?.toLocaleString() }}
    </template>
    <template #cell-taxAmount="{ item }">
      {{ item.taxAmount?.toLocaleString() }}
    </template>
    <template #cell-insurranceAmount="{ item }">
      {{ item.insurranceAmount?.toLocaleString() }}
    </template>
  </data-grid>
</template>

<script setup>
  import { ref } from "vue";
  import { sortOrder } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { wageColumns } from "src/components/areas/prl/_composables/constants";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import ToolbarMobile from "components/shared/ToolBarMobile.vue";

  const gridStore = useBaseInfoGrid({
    columns: wageColumns,
    sortColumn: "month",
    sortOrder: sortOrder.ascending,
  });

  const desktopGrid = ref(null);
  const baseRoute = "prl/wage";
</script>
