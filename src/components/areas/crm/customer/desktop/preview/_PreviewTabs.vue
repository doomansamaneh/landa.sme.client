<template>
  <q-tabs
    v-model="tab"
    class="border-radius-xs bg-primary text-white q-mt-xl"
    indicator-color="white"
    align="justify"
    inline-label
    narrow-indicator
  >
    <q-tab name="profile" label="نمایه" icon="o_person" />
    <q-tab name="quote" label="پیش‌فاکتورها" icon="o_assignment" />
    <q-tab name="invoice" label="فاکتورهای فروش" icon="o_receipt" />
    <q-tab name="account" label="خلاصه حساب" icon="o_summarize" />
    <q-tab name="log" label="تاریخچه" icon="o_history" />
  </q-tabs>

  <q-tab-panels
    class="bordered border-radius-xs q-mt-md"
    v-model="tab"
    animated
  >
    <q-tab-panel name="profile">
      <profile />
    </q-tab-panel>
    <q-tab-panel name="quote">
      <quote />
    </q-tab-panel>
    <q-tab-panel name="invoice">
      <invoice />
    </q-tab-panel>
    <q-tab-panel name="account">
      <account />
    </q-tab-panel>
    <q-tab-panel name="log">
      <log />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { ref } from "vue";

import Invoice from "./_TabPanelInvoice.vue";
import Log from "./_TabPanelLog.vue";
import Account from "./_TabPanelAccount.vue";
import Quote from "./_TabPanelQuote.vue";
import Profile from "./_TabPanelProfile.vue";

const tab = ref("profile");
</script>
