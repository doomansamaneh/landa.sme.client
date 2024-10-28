<template>
  <advanced-search v-if="advancedSearch" />

  <q-card flat class="bordered shadow q-mt-md">
    <q-tabs
      v-model="tab"
      class="primary-tabs"
      :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      align="left"
      inline-label
      narrow-indicator
      @update:model-value="tabChanged"
    >
      <q-tab name="invoice" class="q-mr-xs text-weight-500">
        <template #default>
          <q-icon class="q-mr-sm" size="24px" name="o_check" />
          <div class="text-h6 no-letter-spacing">فاکتورهای فروش</div>
        </template>
      </q-tab>
      <q-tab name="canceled" class="text-weight-500">
        <template #default>
          <q-icon class="q-mr-sm" size="24px" name="cancel" />
          <div class="text-h6 no-letter-spacing">ابطال شده</div>
        </template>
      </q-tab>
    </q-tabs>

    <q-separator size="0.5px" />

    <data-grid :table-store="tableStore" base-route="sls/invoice" />
  </q-card>
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
