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

  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "./AccountPreview.vue";

  const props = defineProps({
    title: String,
    tableStore: useDataTable,
  });
</script>
