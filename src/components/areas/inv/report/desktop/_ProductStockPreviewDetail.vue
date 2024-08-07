<template>
  <q-card-section class="q-px-none">
    <q-tabs
      v-model="tab"
      class="primary-tabs q-mx-sm"
      :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      align="left"
      inline-label
      narrow-indicator
    >
      <q-tab
        class="q-mr-xs"
        name="basic-info"
        label="ریز گردش حساب"
        icon="receipt"
      />
      <q-tab
        class="q-mr-xs"
        name="quote"
        label="ورود و خروج کالا"
        icon="swap_vert"
      />
      <q-tab
        class="q-mr-xs"
        name="log"
        label="تاریخچه"
        icon="o_history"
      />
    </q-tabs>

    <q-separator size="1px" />

    <q-tab-panels class="q-mt-md" v-model="tab" keep-alive animated>
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
      <q-tab-panel class="no-padding" name="log">
        <preview-log :entity-id="item.id" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card-section>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { guidEmpty, sqlOperator } from "src/constants";
  import { useProductStockItemGrid } from "src/components/areas/inv/_composables/useProductStockItemGrid";
  import { accountItemDLColumns } from "src/components/areas/acc/_composables/constants";

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
  const tableStore = computed(() => dataGrid?.value?.tableStore);

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
