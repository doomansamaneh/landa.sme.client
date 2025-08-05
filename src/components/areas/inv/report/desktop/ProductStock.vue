<template>
  <template v-if="showAdvancedSearch">
    <advanced-search class="q-my-md" />
    <tip-banner />
  </template>

  <q-card flat class="bordered shadow">
    <card-title :title="title" icon="import_export" />

    <data-grid
      :data-table-store="tableStore"
      flat
      numbered
      expandable
      toolbar
      wrap-cells
      :title="title"
    >
      <template #expand="{ item }">
        <product-stock-preview :item="item" :title="title" inside />
      </template>
    </data-grid>
  </q-card>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import ProductStockPreview from "../shared/ProductStockPreview.vue";
  import AdvancedSearch from "./ProductStockSearch.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  import TipBanner from "../shared/TipBanner.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    showAdvancedSearch: Boolean,
  });
</script>
