<template>
  <div v-if="advancedSearch" class="q-mb-md">
    <advanced-search />
  </div>

  <q-card flat class="bordered shadow">
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <q-avatar
          rounded
          text-color="white"
          icon="o_shopping_cart"
          size="md"
          class="primary-gradient primary-shadow"
        />
        <card-title v-if="title" :title="title" />
      </div>
      <data-grid-toolbar class="q-pa-md" :table-store="tableStore" />
    </div>

    <q-separator size="1px" />

    <data-grid
      flat
      dense
      multi-select
      toolbar-
      class="border-none"
      :table-store="tableStore"
    />
  </q-card>
</template>

<script setup>
  import DataGrid from "./DataGridTable.vue";
  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";

  const props = defineProps({
    title: String,
    advancedSearch: Boolean,
    tableStore: Object,
  });
</script>
