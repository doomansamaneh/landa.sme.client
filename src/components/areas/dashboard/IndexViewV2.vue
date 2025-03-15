<template>
  <div
    :style="`margin-top: ${
      $q.screen.xs ? 40 : $q.screen.sm ? 36 : 0
    }px`"
  >
    <q-page-sticky class="block bg-main z-1" position="top" expand>
      <q-tabs
        inline-label
        narrow-indicator
        dense
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
  import { ref } from "vue";
  import { useQuasar } from "quasar";

  import GeneralTab from "./tabs/GeneralTab.vue";
  import SalesTab from "./tabs/SalesTab.vue";

  const $q = useQuasar();

  const tab = ref("general");
</script>
