<template>
  <advanced-search />

  <q-tabs
    v-model="tab"
    class="primary-tabs q-mt-md"
    :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
    :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
    narrow-indicator
    align="left"
    inline-label
    @update:model-value="tabChanged"
  >
    <q-tab
      name="invoice"
      class="q-mr-xs text-h6 text-weight-700"
      label="فاکتورهای فروش"
      icon="check"
    />
    <q-tab
      name="canceled"
      class="text-h6 text-weight-700"
      label="ابطال شده"
      icon="o_cancel"
    />
  </q-tabs>

  <q-separator size="1px" />

  <invoice-grid
    ref="invoiceTable"
    :grid-store="gridStore"
    :data-source="dataSource"
    base-route="sls/invoice"
    class="q-mt-md"
  >
    <template #expand="{ item }">
      <preview inside :item="item" />
    </template>
  </invoice-grid>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { sqlOperator, cancelStatus } from "src/constants";

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

  const tab = ref("invoice");

  const tableStore = computed(
    () => invoiceTable.value?.dataTable?.tableStore
  );

  function setDefaultFilter() {
    tableStore.value.setFilterExpression([
      {
        fieldName: "d.StatusId",
        operator: sqlOperator.notEqual,
        value: cancelStatus,
      },
    ]);
  }

  function setCancelFilter() {
    tableStore.value.setFilterExpression([
      {
        fieldName: "d.StatusId",
        operator: sqlOperator.equal,
        value: cancelStatus,
      },
    ]);
  }

  async function tabChanged(e) {
    if (e === "canceled") setCancelFilter();
    else setDefaultFilter();
    await reloadData();
  }

  async function reloadData() {
    await tableStore.value.reloadData();
  }

  defineExpose({
    tableStore,
  });
</script>
