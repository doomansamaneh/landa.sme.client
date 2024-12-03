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
        <card-title v-if="title" :title="title" />
      </div>
    </div>

    <q-separator size="0.5px" />

    <data-grid
      flat
      dense
      multi-select
      :table-store="tableStore"
      :base-route="baseRoute"
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
