<template>
  <q-tabs
    v-model="tab"
    class="text-h6_ text-weight-700_ primary-tabs q-mt-lg"
    :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
    :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
    align="left"
    inline-label
    narrow-indicator
  >
    <q-tab
      class="q-mr-xs"
      name="basic-info"
      label="اطلاعات پایه"
      icon="o_person"
    />
    <q-tab
      class="q-mr-xs"
      name="quote"
      label="پیش‌فاکتورها"
      icon="o_assignment"
    />
    <q-tab
      class="q-mr-xs"
      name="invoice"
      label="فاکتورهای فروش"
      icon="o_receipt"
    />
    <q-tab
      class="q-mr-xs"
      name="account"
      label="خلاصه حساب"
      icon="o_summarize"
    />
    <q-tab
      class="q-mr-xs"
      name="check"
      label="چکهای دریافتی، پرداختی"
      icon="o_receipt"
    />
    <q-tab
      class="q-mr-xs"
      name="log"
      label="تاریخچه"
      icon="o_history"
    />
  </q-tabs>

  <q-separator size="1px" />

  <q-tab-panels
    class="q-mt-md"
    v-model="tab"
    keep-alive
    animated
  >
    <q-tab-panel class="no-padding bg-main" name="basic-info">
      <base-info v-if="item.id" :item="item" />
    </q-tab-panel>
    <q-tab-panel class="no-padding bg-main" name="quote">
      <quote :item="item" />
    </q-tab-panel>
    <q-tab-panel class="no-padding bg-main" name="invoice">
      <invoice :item="item" />
    </q-tab-panel>
    <q-tab-panel class="no-padding bg-main" name="account">
      <account :item="item" />
    </q-tab-panel>
    <q-tab-panel class="no-padding bg-main" name="check">
      <check-item :customer-id="item.id" />
    </q-tab-panel>
    <q-tab-panel class="no-padding bg-main" name="log">
      <log :entity-id="item.id" entity-name="Crm.[Customer]" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";

  import BaseInfo from "./_TabPanelBaseInfo.vue";
  import Quote from "./_TabPanelQuote.vue";
  import Invoice from "./_TabPanelInvoice.vue";
  import Account from "./_TabPanelAccount.vue";
  import CheckItem from "src/components/areas/trs/report/shared/CheckItem.vue";
  import Log from "src/components/areas/_shared/log/PreviewLog.vue";

  const props = defineProps({
    item: Object,
  });

  const $q = useQuasar();
  const tab = ref("basic-info");

  const tabPanels = computed(() => {
    return "no-border no-shadow";
    const isXs = $q.screen.xs;

    return isXs ? "no-border no-shadow" : "bordered border-radius-lg";
    // : tab.value === "basic-info" ||
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
