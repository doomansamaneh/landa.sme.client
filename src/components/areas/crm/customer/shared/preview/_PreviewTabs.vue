<template>
  <q-tabs
    v-model="tab"
    class="text-h6 text-weight-700 primary-tabs q-mt-lg"
    :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
    :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
    align="left"
    inline-label
    narrow-indicator
  >
    <q-tab class="q-mr-xs" name="basic-info" label="اطلاعات پایه" icon="o_person" />
    <q-tab class="q-mr-xs" name="quote" label="پیش‌فاکتورها" icon="o_assignment" />
    <q-tab class="q-mr-xs" name="invoice" label="فاکتورهای فروش" icon="o_receipt" />
    <q-tab class="q-mr-xs" name="account" label="خلاصه حساب" icon="o_summarize" />
    <q-tab class="q-mr-xs" name="log" label="تاریخچه" icon="o_history" />
  </q-tabs>

  <q-separator size="1px" />

  <q-tab-panels
    class="q-mt-md"
    :class="tabPanels"
    v-model="tab"
    animated
  >
    <q-tab-panel
      class="no-padding no-border no-shadow bg-main"
      name="basic-info"
    >
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
  import { useQuasar } from "quasar";

  const $q = useQuasar();

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
      : tab.value === "basic-info" ||
        tab.value === "account" ||
        tab.value === "invoice"
      ? $q.screen.gt.xs
        ? "no-border bg-main"
        : "no-border no-shadow"
      : tab.value === "log"
      ? "bordered border-radius-lg"
      : "bordered border-radius-lg";
  });
</script>
