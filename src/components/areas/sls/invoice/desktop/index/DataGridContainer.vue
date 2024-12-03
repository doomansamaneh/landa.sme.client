<template>
  <advanced-search v-if="advancedSearch" />

  <q-card flat class="bordered shadow">
    <div
      class="row justify-between overflow-hidden primary-gradient-1"
    >
      <q-tabs
        v-model="tab"
        :indicator-color="tabColor"
        :active-color="tabColor"
        align="left"
        inline-label
        narrow-indicator
        @update:model-value="tabChanged"
        content-class="text-on-dark"
      >
        <custom-tab
          name="invoice"
          title="فاکتورهای فروش"
          icon="o_receipt"
        />

        <custom-tab
          name="canceled"
          title="ابطال شده"
          icon="o_cancel"
          avatar-class="red-gradient red-shadow"
        />
      </q-tabs>
    </div>

    <q-separator size="0.5px" />

    <data-grid
      toolbar
      :table-store="tableStore"
      base-route="sls/invoice"
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
  import CustomTab from "src/components/shared/CustomTab.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    advancedSearch: Boolean,
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
