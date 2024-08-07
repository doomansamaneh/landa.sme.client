<template>
  <div v-if="advancedSearch" class="q-mb-md">
    <advanced-search
      :grid-store="gridStore"
      @apply-search="reloadData"
    />
  </div>

  <q-card bordered>
    <q-card-section class="text-center">
      <h6 class="text-weight-700 no-letter-spacing">
        {{ title }}
      </h6>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-px-none">
      <data-grid
        flat
        dense
        multi-select
        toolbar
        class="border-none"
        ref="invoiceTable"
        :grid-store="gridStore"
        :data-source="dataSource"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed, ref } from "vue";

  import DataGrid from "./_DataGrid.vue";
  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";

  const props = defineProps({
    title: String,
    advancedSearch: Boolean,
    gridStore: Object,
    dataSource: String,
    crudStore: Object,
  });

  const invoiceTable = ref(null);

  const tableStore = computed(
    () => invoiceTable.value?.dataTable?.tableStore
  );

  async function reloadData() {
    await tableStore.value.reloadData();
  }

  defineExpose({
    tableStore,
  });
</script>
