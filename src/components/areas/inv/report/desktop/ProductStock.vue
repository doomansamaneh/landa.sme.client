<template>
  <advanced-search class="q-my-md" :grid-store="gridStore" />

  <q-card flat class="bordered shadow">
    <card-title
      :title="$t('main-menu-items.Sls_Report_ProductStock')"
      icon="import_export"
    />

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
        {{ helper.formatNumber(item.purchaseQuantity) }}
      </template>
      <template #cell-salesQuantity="{ item }">
        {{ helper.formatNumber(item.salesQuantity) }}
      </template>
      <template #cell-stock="{ item }">
        <span class="text-weight-600">
          {{ helper.formatNumber(item.stock) }}
        </span>
      </template>
      <template #cell-debit="{ item }">
        {{ helper.formatNumber(item.debit) }}
      </template>

      <template #expand="{ item }">
        <product-stock-preview :item="item" inside />
      </template>
    </data-grid>
  </q-card>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import { helper, bus } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

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

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: props.gridStore,
  });

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
