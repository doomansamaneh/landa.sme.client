<template>
  <advanced-search v-if="advancedSearch" />

  <q-card bordered>
    <card-title :title="title" />
    <q-card-section class="q-px-none">
      <data-grid :table-store="tableStore" :base-route="baseRoute" />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGrid from "./DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    advancedSearch: Boolean,
    title: String,
  });
</script>
