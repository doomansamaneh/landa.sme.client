<template>
  <div
    :style="`margin-top: ${
      $q.screen.xs ? 40 : $q.screen.sm ? 36 : 0
    }px`"
  >
    <q-page-sticky
      class="block bg-main z-2"
      position="top"
      expand
      style="margin-top: -1px"
    >
      <q-tabs
        inline-label
        narrow-indicator
        dense
        :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
        align="left"
        v-model="state.tab.value"
      >
        <q-tab
          name="general"
          icon="o_dashboard"
          :label="$t('dashboard.tabs.general')"
        />
        <q-tab
          name="sales"
          v-access="`sls.report.salesReview`"
          icon="o_receipt"
          :label="$t('dashboard.tabs.sales')"
        />
        <q-tab
          name="expense"
          v-access="`acc.report.accountReview`"
          icon="o_attach_money"
          :label="$t('dashboard.tabs.expense')"
        />
        <q-tab
          name="cheque-notification"
          v-access="`acc.report.accountReview`"
          icon="campaign"
          :label="$t('dashboard.tabs.chequeNotification')"
        >
          <q-badge v-if="notificationCount" color="red" floating>
            {{ notificationCount }}
          </q-badge>
        </q-tab>
      </q-tabs>

      <q-separator />
    </q-page-sticky>

    <keep-alive>
      <component :is="currentTab" :key="state.tab.value" />
    </keep-alive>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useTabsState } from "./_composables/useTabsState";
  import { useChequeNotification } from "src/composables/useChequeNotification";

  import GeneralTab from "./tabs/GeneralTab.vue";
  import SalesTab from "./tabs/SalesTab.vue";
  import ExpenseTab from "./tabs/ExpenseTab.vue";
  import ChequeNotificationTab from "./tabs/ChequeNoTificationTab.vue";

  const state = useTabsState();
  const { notificationCount } = useChequeNotification();

  const currentTab = computed(() => {
    switch (state.tab.value) {
      case "general":
        return GeneralTab;
      case "sales":
        return SalesTab;
      case "expense":
        return ExpenseTab;
      case "cheque-notification":
        return ChequeNotificationTab;
      default:
        return GeneralTab;
    }
  });
</script>
