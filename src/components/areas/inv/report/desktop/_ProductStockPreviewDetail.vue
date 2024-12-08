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
      <custom-tab
        name="basic-info"
        title="ریز گردش حساب"
        icon="o_receipt"
      />

      <custom-tab
        name="quote"
        title="ورود و خروج کالا"
        icon="swap_vert"
      />

      <custom-tab name="log" title="تاریخچه" icon="o_history" />
    </q-tabs>
  </div>

  <q-separator size="1px" />

  <q-tab-panels v-model="tab" keep-alive animated>
    <q-tab-panel class="no-padding" name="basic-info">
      <account-item
        flat
        :columns="accountItemColumns"
        :filter-expression="accountItemfilter"
        :no-fullscreen="true"
      />
    </q-tab-panel>
    <q-tab-panel class="no-padding" name="quote">
      <product-stock-item
        ref="dataGrid"
        :data-source="dataSource"
        :grid-store="gridStore"
        :no-fullscreen="true"
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

  import CustomTab from "src/components/shared/CustomTab.vue";
  import ProductStockItem from "./ProductStockItem.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";
  import PreviewLog from "src/components/areas/_shared/log/PreviewLog.vue";

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
