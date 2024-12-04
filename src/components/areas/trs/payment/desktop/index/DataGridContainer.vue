<template>
  <q-card flat class="bordered shadow">
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <custom-tab
          behavior="heading"
          :title="title"
          :icon="`o_${icon}`"
        />
      </div>
    </div>

    <q-separator size="1px" />

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
  import CustomTab from "src/components/shared/CustomTab.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    advancedSearch: Boolean,
    title: String,
    icon: String,
  });
</script>
