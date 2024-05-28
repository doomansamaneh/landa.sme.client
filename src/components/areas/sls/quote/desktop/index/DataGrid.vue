<template>
  <advanced-search
    :grid-store="gridStore"
    @apply-search="reloadData"
  />

  <div class="q-mt-lg">
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
  </div>
</template>

<script setup>
  import { computed, ref } from "vue";

  import InvoiceGrid from "components/areas/sls/_shared/invoice/desktop/index/DataGrid.vue";
  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";
  import Preview from "../../shared/preview/IndexView.vue";

  const props = defineProps({
    gridStore: Object,
    title: String,
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
