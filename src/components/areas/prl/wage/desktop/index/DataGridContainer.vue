<template>
  <q-card flat class="bordered shadow">
    <card-title
      :title="$t('main-menu-items.Prl_Wage_View')"
      :icon="`o_${icon}`"
    />

    <data-grid
      :table-store="tableStore"
      :base-route="baseRoute"
      :title="title"
    />
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
    icon: String,
  });
</script>
