<template>
  <q-tabs
    v-model="tab"
    class="text-weight-700 bg-green q-mt-lg"
    :indicator-color="$q.dark.isActive ? 'yellow' : 'white'"
    :active-color="$q.dark.isActive ? 'yellow' : 'white'"
    align="left"
    inline-label
    narrow-indicator
  >
    <q-tab
      class="q-mr-xs"
      name="product"
      label="کالاهای تولید شده"
      icon="o_keyboard"
    />
    <q-tab
      class="q-mr-xs"
      name="scrap"
      label="ضایعات"
      icon="o_assignment"
    />
  </q-tabs>

  <q-tab-panels class="q-mt-md" v-model="tab" keep-alive animated>
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

  const props = defineProps({
    formStore: Object,
  });

  const $q = useQuasar();
  const tab = ref("product");

  const tabPanels = computed(() => {
    return "no-border no-shadow";
    const isXs = $q.screen.xs;

    return isXs ? "no-border no-shadow" : "bordered border-radius-lg";
    // : tab.value === "product" ||
    //   tab.value === "account" ||
    //   tab.value === "invoice"
    // ? $q.screen.gt.xs
    //   ? "no-border bg-main"
    //   : "no-border no-shadow"
    // : tab.value === "log"
    // ? "bordered border-radius-lg"
    // : "bordered border-radius-lg";
  });
</script>
