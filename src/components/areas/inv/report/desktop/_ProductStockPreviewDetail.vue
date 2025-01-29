<template>
  <card-tabs
    v-model="tab"
    class="primary-tabs"
    :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
    :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
    align="left"
    inline-label
    narrow-indicator
  >
    <card-tab
      name="basic-info"
      title="ریز گردش حساب"
      icon="o_receipt"
    />

    <card-tab
      name="quote"
      title="ورود و خروج کالا"
      icon="swap_vert"
    />

    <card-tab name="log" title="تاریخچه" icon="o_history" />
  </card-tabs>

  <q-tab-panels v-model="tab" keep-alive animated>
    <q-tab-panel class="no-padding" name="basic-info">
      <account-item
        :columns="accountItemDLColumns"
        :filter-expression="accountItemfilter"
        no-fullscreen
        :title="`ریز گردش حساب / ${item.code} - ${item.title}`"
      />
    </q-tab-panel>
    <q-tab-panel class="no-padding" name="quote">
      <product-stock-item
        :filter-expression="stockFilter"
        no-fullscreen
        :title="`کاردکس کالا / ${item.code} - ${item.title}`"
      />
    </q-tab-panel>
    <q-tab-panel name="log">
      <preview-log :entity-id="item.id" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { guidEmpty, sqlOperator } from "src/constants";
  import { accountItemDLColumns } from "src/components/areas/acc/_composables/constants";

  import CardTabs from "src/components/shared/CardTabs.vue";
  import CardTab from "src/components/shared/CardTab.vue";
  import ProductStockItem from "./ProductStockItem.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";
  import PreviewLog from "src/components/areas/_shared/log/PreviewLog.vue";

  const props = defineProps({
    item: Object,
    title: String,
  });

  const tab = ref("basic-info");
  const stockFilter = computed(() => [
    {
      fieldName: "ii.productId",
      operator: sqlOperator.equal,
      value: props.item.id,
    },
  ]);

  const accountItemfilter = computed(() => [
    {
      fieldName: "vi.dlId",
      operator: sqlOperator.equal,
      value: props.item.dlId ?? guidEmpty,
    },
  ]);
</script>
