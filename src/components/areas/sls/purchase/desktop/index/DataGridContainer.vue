<template>
  <div v-if="advancedSearch" class="q-mb-md">
    <advanced-search />
  </div>

  <q-card bordered>
    <card-title :title="title" />
    <q-card-section class="q-px-none">
      <purchase-data-grid :table-store="tableStore" />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import PurchaseDataGrid from "./PurchaseDataGrid.vue";
  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    advancedSearch: {
      default: true,
      type: Boolean,
    },
  });
</script>
