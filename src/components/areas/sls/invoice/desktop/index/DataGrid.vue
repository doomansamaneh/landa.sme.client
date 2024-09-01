<template>
  <advanced-search v-if="advancedSearch" />

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
      class="q-mr-xs text-h6 text-weight-500"
      label="فاکتورهای فروش"
      icon="check"
    >
      <!-- <q-badge>
        {{ tableStore?.pagination.value.totalItems }}
      </q-badge> -->
    </q-tab>
    <q-tab
      name="canceled"
      class="text-h6 text-weight-500"
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
    class="shadow bordered q-mt-md"
  />
</template>

<script setup>
  import { computed, ref } from "vue";
  import { sqlOperator, voucherStatus } from "src/constants";

  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";
  import InvoiceGrid from "./_DataGrid.vue";

  const props = defineProps({
    gridStore: Object,
    title: String,
    dataSource: String,
    crudStore: Object,
    advancedSearch: Boolean,
  });

  const invoiceTable = ref(null);

  const tab = ref("invoice");

  const tableStore = computed(() => invoiceTable.value?.tableStore);

  function setDefaultFilter() {
    tableStore.value.setFilterExpression([
      {
        fieldName: "d.StatusId",
        operator: sqlOperator.notEqual,
        value: voucherStatus.canceled,
      },
    ]);
  }

  function setCancelFilter() {
    tableStore.value.setFilterExpression([
      {
        fieldName: "d.StatusId",
        operator: sqlOperator.equal,
        value: voucherStatus.canceled,
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
