<template>
  <div v-if="advancedSearch" class="q-mb-md">
    <advanced-search />
  </div>

  <q-card flat class="bordered shadow">
    <card-tabs
      v-model="tab"
      :indicator-color="tabColor"
      :active-color="tabColor"
      @tabChanged="tabChanged"
    >
      <card-tab
        name="invoice"
        title="فاکتورهای فروش"
        icon="o_receipt"
      />

      <card-tab
        name="canceled"
        title="ابطال شده"
        icon="o_cancel"
        avatar-class="red-gradient red-shadow"
      />
    </card-tabs>

    <data-grid
      :table-store="tableStore"
      toolbar
      :title="`${title}`"
      base-route="sls/invoice"
      :no-fullscreen="noFullscreen"
    />
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { sqlOperator, voucherStatus } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";
  import { useQuasar } from "quasar";

  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";
  import DataGrid from "./DataGrid.vue";
  import CardTabs from "src/components/shared/CardTabs.vue";
  import CardTab from "src/components/shared/CardTab.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    advancedSearch: Boolean,
    noFullscreen: Boolean,
  });

  const $q = useQuasar();
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

  const tabColor = computed(() =>
    $q.dark.isActive
      ? "yellow"
      : tab.value == "canceled"
      ? "negative"
      : "primary"
  );
</script>
