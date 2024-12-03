<template>
  <advanced-search v-if="advancedSearch" />

  <q-card flat class="bordered shadow">
    <div
      class="row justify-between overflow-hidden primary-gradient-1"
    >
      <q-tabs
        v-model="tab"
        :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
        :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
        align="left"
        inline-label
        narrow-indicator
        @update:model-value="tabChanged"
        content-class="text-on-dark"
      >
        <q-tab name="invoice" class="q-mr-xs text-weight-700">
          <template #default>
            <div class="row items-center">
              <q-avatar
                rounded
                text-color="white"
                icon="o_receipt"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">
                فاکتورهای فروش
              </div>
            </div>
          </template>
        </q-tab>
        <q-tab name="canceled" class="text-weight-700">
          <template #default>
            <div class="row items-center">
              <q-avatar
                rounded
                text-color="white"
                icon="o_cancel"
                size="md"
                class="red-gradient red-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">ابطال شده</div>
            </div>
          </template>
        </q-tab>
      </q-tabs>

      <data-grid-toolbar class="q-pa-md" :table-store="tableStore" />
    </div>

    <q-separator size="1px" />

    <data-grid :table-store="tableStore" base-route="sls/invoice" />
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { sqlOperator, voucherStatus } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";
  import DataGrid from "./DataGrid.vue";
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";

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
