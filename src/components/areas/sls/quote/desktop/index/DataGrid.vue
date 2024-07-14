<template>
  <div v-if="advancedSearch" class="q-mb-md">
    <advanced-search
      :grid-store="gridStore"
      @apply-search="reloadData"
    />
  </div>

  <invoice-grid
    ref="invoiceTable"
    :grid-store="gridStore"
    :data-source="dataSource"
    base-route="sls/quote"
  >
    <template #expand="{ item }">
      <preview :item="item" inside />
    </template>
  </invoice-grid>
</template>

<script setup>
  import { computed, ref } from "vue";

  import InvoiceGrid from "components/areas/sls/_shared/invoice/desktop/index/DataGrid.vue";
  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";
  import Preview from "../../shared/preview/IndexView.vue";

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
