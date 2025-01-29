<template>
  <q-card bordered>
    <card-title :title="title" icon="o_group" />

    <data-grid
      :data-table-store="tableStore"
      :title="title"
      separator="horizontal"
      flat
      toolbar
      expandable
    >
      <template #expand="{ item }">
        <div class="q-mb-sm">
          <preview :item="item" :title="title" inside />
        </div>
      </template>
    </data-grid>
  </q-card>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "./AccountPreview.vue";

  const props = defineProps({
    title: String,
    tableStore: useDataTable,
  });
</script>
