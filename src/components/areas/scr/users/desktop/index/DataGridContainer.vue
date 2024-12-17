<template>
  <q-card flat class="bordered shadow">
    <card-title :title="title" :icon="`o_${icon}`" />

    <user-data-grid
      :table-store="tableStore"
      :base-route="baseRoute"
    />
  </q-card>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import CardTitle from "src/components/shared/CardTitle.vue";
  import UserDataGrid from "./DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    title: String,
    icon: String,
  });
</script>
