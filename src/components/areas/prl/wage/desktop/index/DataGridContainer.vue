<template>
  <q-card flat class="bordered shadow">
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <q-avatar
          rounded
          text-color="white"
          size="md"
          :icon="`o_${icon}`"
          class="primary-gradient primary-shadow"
        />
        <card-title :title="$t('main-menu-items.Prl_Wage_View')" />
        
      </div>

      <data-grid-toolbar />
    </div>

    <q-separator size="1px" />

    <data-grid :table-store="tableStore" :base-route="baseRoute" />
  </q-card>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGridToolbar from "src/components/shared/dataTables/desktop/DataGridToolbar.vue";
  import DataGrid from "./DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    advancedSearch: Boolean,
    title: String,
    icon: String,
  });
</script>
