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

  <data-grid
    :table-store="tableStore"
    base-route="sls/invoice"
    class="shadow bordered q-mt-md"
  />
</template>

<script setup>
  import { ref, computed } from "vue";
  import { sqlOperator, voucherStatus } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";
  import DataGrid from "./DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    advancedSearch: Boolean,
  });

  //const tab = computed(() => props.tableStore.store.currentTab);
  const tab = ref("invoice");

  function setDefaultFilter() {
    props.tableStore.setFilterExpression([
      {
        fieldName: "d.StatusId",
        operator: sqlOperator.notEqual,
        value: voucherStatus.canceled,
      },
    ]);
  }

  function setCancelFilter() {
    props.tableStore.setFilterExpression([
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
    await props.tableStore.reloadData();
  }
</script>
