<template>
  <div v-if="advancedSearch" class="q-mb-md">
    <advanced-search />
  </div>

  <q-card flat class="bordered shadow">
    <card-title :title="title" icon="o_assignment" />

    <data-grid
      flat
      dense
      multi-select
      toolbar
      class="border-none"
      :table-store="tableStore"
      :no-fullscreen="noFullscreen"
    />
  </q-card>
</template>

<script setup>
  import DataGrid from "./DataGridTable.vue";
  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    title: String,
    advancedSearch: Boolean,
    tableStore: Object,
    noFullscreen: Boolean,
  });
</script>
