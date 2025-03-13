<template>
  <div
    :style="
      $q.screen.xs
        ? 'margin-top: 48px'
        : $q.screen.sm
        ? 'margin-top: 48px'
        : 'margin-top: 8px'
    "
  >
    <q-page-sticky
      :style="toolbarStyle"
      class="block bg-main z-1"
      position="top"
      expand
    >
      <q-tabs
        inline-label
        active-color="primary"
        align="left"
        v-model="tab"
      >
        <q-tab name="general" icon="apps" label="عمومی" />
        <q-tab name="sales" icon="shopping_basket" label="فروش" />
        <q-tab name="expense" icon="receipt_long" label="هزینه" />
      </q-tabs>

      <q-separator />
    </q-page-sticky>

    <keep-alive>
      <div>
        <template v-if="tab === 'general'">
          <general-tab />
        </template>
        <template v-if="tab === 'sales'">
          <sales-tab />
        </template>
      </div>
    </keep-alive>
  </div>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { useQuasar } from "quasar";

  import GeneralTab from "./tabs/GeneralTab.vue";
  import SalesTab from "./tabs/SalesTab.vue";

  const $q = useQuasar();

  const tab = ref("general");

  const toolbarStyle = computed(() => {
    if ($q.screen.xs) {
      return "z-index: 2; padding: 0 16px 0 16px;";
    } else if ($q.screen.sm) {
      return "z-index: 2; padding: 0 24px 0 24px;";
    } else {
      return "z-index: 2; padding: 0 38px 0 38px;";
    }
  });
</script>
