<template>
  <advanced-search v-if="advancedSearch" />

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

    <voucher-data-grid
      :table-store="tableStore"
      :base-route="baseRoute"
    />
  </q-card>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import AdvancedSearch from "./AdvancedSearch.vue";
  import CustomTab from "src/components/shared/CustomTab.vue";
  import VoucherDataGrid from "./DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    advancedSearch: Boolean,
    title: String,
    icon: String,
  });
</script>
