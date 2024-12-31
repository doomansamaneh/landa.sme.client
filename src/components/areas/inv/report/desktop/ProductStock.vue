<template>
  <advanced-search class="q-my-md" />

  <q-card flat class="bordered shadow">
    <card-title :title="title" icon="import_export" />

    <data-grid
      :data-table-store="tableStore"
      flat
      numbered
      expandable
      toolbar
    >
      <template #cell-purchaseQuantity="{ item }">
        {{ helper.formatNumber(item.purchaseQuantity) }}
      </template>
      <template #cell-salesQuantity="{ item }">
        {{ helper.formatNumber(item.salesQuantity) }}
      </template>
      <template #cell-stock="{ item }">
        <span class="text-weight-600">
          {{ helper.formatNumber(item.stock) }}
        </span>
      </template>
      <template #cell-debit="{ item }">
        <span class="text-weight-600">
          {{ helper.formatNumber(item.debit) }}
        </span>
      </template>

      <template #expand="{ item }">
        <product-stock-preview :item="item" inside />
      </template>
    </data-grid>
  </q-card>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import ProductStockPreview from "../shared/ProductStockPreview.vue";
  import AdvancedSearch from "./ProductStockSearch.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
  });
</script>
