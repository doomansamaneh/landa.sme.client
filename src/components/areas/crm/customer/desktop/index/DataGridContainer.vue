<template>
  <advanced-search v-if="advancedSearch" />

  <q-card flat class="bordered shadow">
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <q-avatar
          rounded
          text-color="white"
          size="md"
          icon="o_line_style"
          class="primary-gradient primary-shadow"
        />
        <card-title :title="title" />
      </div>
      <data-grid-toolbar
        class="q-pa-md"
        :table-store="tableStore"
        :baseRoute="baseRoute"
      />
    </div>

    <q-separator size="1px" />

    <q-card-section class="q-px-none">
      <data-grid :table-store="tableStore" :base-route="baseRoute" />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGrid from "./DataGrid.vue";
  import DataGridToolbar from "src/components/shared/dataTables/desktop/DataGridToolbar.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    advancedSearch: Boolean,
    title: String,
  });
</script>
