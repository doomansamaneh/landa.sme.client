<template>
  <q-tabs v-model="tab" class="border-radius-xl bg-primary text-white q-mt-lg" indicator-color="white" align="start"
    inline-label narrow-indicator>
    <q-tab name="basic-info" label="اطلاعات پایه" icon="o_person" />
    <q-tab name="quote" label="پیش‌فاکتورها" icon="o_assignment" />
    <q-tab name="invoice" label="فاکتورهای فروش" icon="o_receipt" />
    <q-tab name="account" label="خلاصه حساب" icon="o_summarize" />
    <q-tab name="log" label="تاریخچه" icon="o_history" />
  </q-tabs>

  <q-tab-panels class="q-mt-md" :class="tabPanels" v-model="tab" animated>

    <q-tab-panel class="no-padding no-border no-shadow bg-main" name="basic-info">
      <basic-info />
    </q-tab-panel>
    <q-tab-panel class="no-padding bg-main" name="quote">
      <quote />
    </q-tab-panel>
    <q-tab-panel class="no-padding bg-main" name="invoice">
      <invoice />
    </q-tab-panel>
    <q-tab-panel class="no-padding bg-main" name="account">
      <account />
    </q-tab-panel>
    <q-tab-panel class="no-padding" name="log">
      <log />
    </q-tab-panel>

  </q-tab-panels>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar"

const $q = useQuasar()

import Invoice from "./_TabPanelInvoice.vue";
import Log from "./_TabPanelLog.vue";
import Account from "./_TabPanelAccount.vue";
import Quote from "./_TabPanelQuote.vue";
import BasicInfo from "./_TabPanelBasicInfo.vue";

const tab = ref("basic-info");

const tabPanels = computed(() => {
  const isXs = $q.screen.xs;

  return isXs
    ? "no-border no-shadow"
    : tab.value === "basic-info" || tab.value === "account"
    ? $q.screen.gt.xs
      ? "no-border bg-main"
      : "no-border no-shadow"
    : tab.value === "log"
    ? "bordered border-radius-xl"
    : "bordered border-radius-xl";
});
</script>
