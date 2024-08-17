<template>
  <advanced-search class="q-my-md" :grid-store="gridStore" />

  <q-card bordered>
    <card-title :title="title" />

    <q-card-section class="q-px-none">
      <data-grid
        ref="dataGrid"
        :grid-store="gridStore"
        :data-source="dataSource"
        base-route="sls/report/productStock"
        flat
        numbered
        expandable
        toolbar
      >
        <template #cell-purchaseQuantity="{ item }">
          {{ item.purchaseQuantity?.toLocaleString() }}
        </template>
        <template #cell-salesQuantity="{ item }">
          {{ item.salesQuantity?.toLocaleString() }}
        </template>
        <template #cell-stock="{ item }">
          {{ item.stock?.toLocaleString() }}
        </template>
        <template #cell-debit="{ item }">
          {{ item.debit?.toLocaleString() }}
        </template>

        <template #expand="{ item }">
          <product-stock-preview :item="item" inside />
        </template>
      </data-grid>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed, ref, onMounted, onUnmounted } from "vue";
  import { bus } from "src/helpers";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import ProductStockPreview from "../shared/ProductStockPreview.vue";
  import AdvancedSearch from "./ProductStockSearch.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    gridStore: Object,
    dataSource: String,
    crudStore: Object,
    title: String,
  });

  const dataGrid = ref(null);

  const tableStore = computed(() => dataGrid.value?.tableStore);

  async function reloadData() {
    await tableStore.value.reloadData();
  }

  onMounted(() => {
    bus.on("apply-search", reloadData);
  });

  onUnmounted(() => {
    bus.off("apply-search", reloadData);
  });

  defineExpose({
    tableStore,
  });
</script>
