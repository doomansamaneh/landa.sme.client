<template>
  <q-separator size="1px" />
  <div class="row justify-between overflow-hidden primary-gradient-1">
    <q-tabs
      v-model="tab"
      class="primary-tabs"
      :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      align="left"
      inline-label
      narrow-indicator
    >
      <q-tab name="basic-info" class="text-weight-700">
        <template #default>
          <div class="row items-center">
            <q-avatar
              rounded
              text-color="white"
              icon="o_receipt"
              size="md"
              class="primary-gradient primary-shadow q-mr-md"
            />
            <div class="text-h6 no-letter-spacing">ریز گردش حساب</div>
          </div>
        </template>
      </q-tab>
      <q-tab name="quote" class="text-weight-700">
        <template #default>
          <div class="row items-center">
            <q-avatar
              rounded
              text-color="white"
              icon="swap_vert"
              size="md"
              class="primary-gradient primary-shadow q-mr-md"
            />
            <div class="text-h6 no-letter-spacing">
              ورود و خروج کالا
            </div>
          </div>
        </template>
      </q-tab>
      <q-tab name="log" class="text-weight-700">
        <template #default>
          <div class="row items-center">
            <q-avatar
              rounded
              text-color="white"
              icon="o_history"
              size="md"
              class="primary-gradient primary-shadow q-mr-md"
            />
            <div class="text-h6 no-letter-spacing">تاریخچه</div>
          </div>
        </template>
      </q-tab>
    </q-tabs>

    <data-grid-toolbar class="q-pa-md" :table-store="tableStore" />
  </div>

  <q-separator size="1px" />

  <q-tab-panels v-model="tab" keep-alive animated>
    <q-tab-panel class="no-padding" name="basic-info">
      <account-item
        flat
        :columns="accountItemColumns"
        :filter-expression="accountItemfilter"
      />
    </q-tab-panel>
    <q-tab-panel class="no-padding" name="quote">
      <product-stock-item
        ref="dataGrid"
        toolbar
        :data-source="dataSource"
        :grid-store="gridStore"
      />
    </q-tab-panel>
    <q-tab-panel class="no-padding_" name="log">
      <preview-log :entity-id="item.id" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { guidEmpty, sqlOperator } from "src/constants";
  import { useProductStockItemGrid } from "src/components/areas/inv/_composables/useProductStockItemGrid";
  import { accountItemDLColumns } from "src/components/areas/acc/_composables/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import ProductStockItem from "./ProductStockItem.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";
  import PreviewLog from "src/components/areas/_shared/log/PreviewLog.vue";
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";

  const props = defineProps({
    item: Object,
  });

  const tab = ref("basic-info");
  const dataGrid = ref(null);
  const filterExpersions = computed(() => [
    {
      fieldName: "ii.productId",
      operator: sqlOperator.equal,
      value: props.item.id,
    },
  ]);

  const dataSource = "sls/report/getProductStockItems";
  const gridStore = useProductStockItemGrid(filterExpersions?.value);
  // const tableStore = computed(() => dataGrid?.value?.tableStore);

  const tableStore = useDataTable({
    dataSource: dataSource,
    store: gridStore,
  });
  const accountItemColumns = accountItemDLColumns;
  const accountItemfilter = computed(() => [
    {
      fieldName: "vi.dlId",
      operator: sqlOperator.equal,
      value: props.item.dlId ?? guidEmpty,
    },
  ]);

  defineExpose({
    tableStore,
  });
</script>
