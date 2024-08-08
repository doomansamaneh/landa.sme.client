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
      <invoice-grid
        flat
        dense
        multi-select
        toolbar
        ref="invoiceTable"
        :grid-store="gridStore"
        :data-source="dataSource"
        base-route="sls/purchase"
      >
        <template #expand="{ item }">
          <preview inside :item="item" />
        </template>
      </invoice-grid>
    </q-card-section>
  </q-card>
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
    advancedSearch: {
      default: true,
      type: Boolean,
    },
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
