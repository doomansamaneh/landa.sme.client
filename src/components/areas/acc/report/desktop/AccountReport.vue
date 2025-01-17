<template>
  <q-card bordered>
    <card-title :title="title" icon="o_group" />

    <data-grid
      :data-table-store="tableStore"
      separator="horizontal"
      flat
      toolbar
      expandable
    >
      <template #toolbar="{ tableStore }">
        <toolbar class="q-pa-md" :table-store="tableStore">
          <template #print-button>
            <q-btn
              size="11px"
              round
              unelevated
              to="/Acc/Report/Customer/Preview"
            >
              <q-icon size="21px" name="o_print" />
              <q-tooltip :delay="700" class="custom-tooltip">
                <div class="text-body2 no-letter-spacing">چاپ</div>
              </q-tooltip>
            </q-btn>
          </template>
        </toolbar>
      </template>
      <template #cell-debit="{ item }">
        {{ helper.formatNumber(item.debit) }}
      </template>

      <template #cell-credit="{ item }">
        {{ helper.formatNumber(item.credit) }}
      </template>

      <template #cell-debitRemained="{ item }">
        <span class="text-weight-600">
          {{ helper.formatNumber(item.debitRemained) }}
        </span>
      </template>

      <template #cell-creditRemained="{ item }">
        <span class="text-weight-600">
          {{ helper.formatNumber(item.creditRemained) }}
        </span>
      </template>

      <template #expand="{ item }">
        <div class="q-mb-sm">
          <preview :item="item" inside />
        </div>
      </template>
    </data-grid>
  </q-card>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  import Toolbar from "src/components/shared/DataTables/desktop/DataGridToolbar.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "./AccountPreview.vue";

  const props = defineProps({
    title: String,
    tableStore: useDataTable,
  });
</script>
