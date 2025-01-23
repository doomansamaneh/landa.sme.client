<template>
  <advanced-search v-if="advancedSearch" />

  <q-card flat class="bordered shadow">
    <card-title :title="title" :icon="`o_${icon}`" />

    <voucher-data-grid
      :table-store="tableStore"
      :base-route="baseRoute"
      :title="title"
    />
  </q-card>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import AdvancedSearch from "./AdvancedSearch.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  import VoucherDataGrid from "./DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    advancedSearch: Boolean,
    title: String,
    icon: String,
  });
</script>
