<template>
  <div v-if="advancedSearch" class="q-mb-md">
    <advanced-search />
  </div>

  <q-card flat class="bordered shadow">
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <custom-tab
          behavior="heading"
          icon="o_assignment"
          :title="title"
        />
      </div>
    </div>

    <q-separator size="1px" />

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
  import CustomTab from "src/components/shared/CustomTab.vue";

  const props = defineProps({
    title: String,
    advancedSearch: Boolean,
    tableStore: Object,
    noFullscreen: Boolean
  });
</script>
