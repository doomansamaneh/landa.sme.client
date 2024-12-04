<template>
  <q-tabs
    v-model="tab"
    class="primary-tabs text-weight-500 q-mt-lg"
    align="left"
    inline-label
    narrow-indicator
  >
    <q-tab
      :class="tabClass('production-used-items')"
      class="text-primary bg-blue-1 q-mr-sm"
      name="production-used-items"
      label="کالاهای استفاده شده"
      icon="o_assignment"
    />
    <q-tab
      :class="tabClass('production-costs')"
      class="text-negative bg-red-1 q-mr-sm"
      name="production-costs"
      label="سربار و هزینه تولید"
      icon="o_assignment"
    />
    <q-tab
      :class="tabClass('product')"
      class="text-green-8 bg-green-1 q-mr-sm"
      name="product"
      label="کالاهای تولید شده"
      icon="o_keyboard"
    />
    <q-tab
      :class="tabClass('scrap')"
      class="text-orange-8 bg-orange-1"
      name="scrap"
      label="ضایعات"
      icon="o_assignment"
    />
  </q-tabs>

  <q-separator size="1px" />

  <q-tab-panels class="q-mt-md" v-model="tab" keep-alive animated>
    <q-tab-panel
      class="no-padding bg-main"
      name="production-used-items"
    >
      <production-used-items :form-store="formStore" />
    </q-tab-panel>

    <q-tab-panel class="no-padding bg-main_" name="production-costs">
      <production-costs :form-store="formStore" />
    </q-tab-panel>

    <q-tab-panel class="no-padding bg-main_" name="product">
      <product-items :form-store="formStore" />
    </q-tab-panel>

    <q-tab-panel class="no-padding bg-main" name="scrap">
      <scrap-items :form-store="formStore" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";

  import ProductItems from "./_ProductItems.vue";
  import ScrapItems from "./_ScrapItems.vue";
  import ProductionUsedItems from "./ProductionUsedItems.vue";
  import ProductionCosts from "./ProductionCosts.vue";

  const props = defineProps({
    formStore: Object,
  });

  const $q = useQuasar();
  const tab = ref("product");

  const tabClass = (tabName) => {
    const styles = {
      product: "text-green-8 bg-green-1",
      scrap: "text-orange-8 bg-orange-1",
      "production-costs": "text-negative bg-red-1",
      "production-used-items": "text-primary bg-primary-1",
    };

    return tab.value === tabName ? styles[tabName] : "";
  };
</script>
