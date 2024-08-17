<template>
  <div v-if="advancedSearch" class="q-mb-md">
    <advanced-search
      :grid-store="gridStore"
      @apply-search="reloadData"
    />
  </div>

  <q-card bordered>
    <card-title :title="title" />
    <q-card-section class="q-px-none">
      <invoice-grid
        flat
        dense
        multi-select
        toolbar
        ref="invoiceTable"
        :grid-store="gridStore"
        :data-source="dataSource"
        base-route="sls/salesReturn"
      >
        <template #expand="{ item }">
          <preview :item="item" />
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
  import CardTitle from "src/components/shared/CardTitle.vue";

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
