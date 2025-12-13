<template>
  <!-- <toolbar-desktop margin :title="title" /> -->

  <!-- Desktop View: Original card-tabs -->
  <template v-if="$q.screen.gt.xs">
    <q-card flat class="bordered shadow">
      <card-tabs
        v-model="tab"
        :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
        :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
        align="left"
        inline-label
        narrow-indicator
        content-class="text-on-dark"
      >
        <card-tab
          name="received"
          icon="o_arrow_downward"
          :title="$t('dashboard.chequeNotificationTab.received')"
        />
        <card-tab
          name="payed"
          icon="o_arrow_upward"
          :title="$t('dashboard.chequeNotificationTab.payed')"
        />
      </card-tabs>

      <data-grid
        v-if="tab === 'received'"
        :filter-expression="receiptFilter"
        :title="$t('dashboard.chequeNotificationTab.received')"
      />
      <data-grid
        v-else
        :filter-expression="payedFilter"
        :title="$t('dashboard.chequeNotificationTab.payed')"
      />
    </q-card>
  </template>

  <!-- Mobile View: Tabs -->
  <template v-else>
    <div class="col-12">
      <q-tabs
        v-model="activeTab"
        no-caps
        inline-label
        narrow-indicator
        :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
        align="left"
      >
        <q-tab
          name="received"
          :icon="'o_receipt'"
          :label="$t('dashboard.chequeNotificationTab.received')"
        />
        <q-tab
          name="payed"
          :icon="'o_payment'"
          :label="$t('dashboard.chequeNotificationTab.payed')"
        />
      </q-tabs>
      <q-separator />
    </div>

    <q-tab-panels keep-alive v-model="activeTab">
      <q-tab-panel name="received" class="q-pa-sm">
        <check-data-grid-mobile :filter-expression="receiptFilter" />
      </q-tab-panel>
      <q-tab-panel name="payed" class="q-pa-sm">
        <check-data-grid-mobile :filter-expression="payedFilter" />
      </q-tab-panel>
    </q-tab-panels>
  </template>
</template>

<script setup>
  import { ref } from "vue";
  import { sqlOperator, documentType } from "src/constants";

  import DataGrid from "../desktop/_CheckItemDataGrid.vue";
  import CheckDataGridMobile from "src/components/areas/trs/report/mobile/_CheckItemDataGrid.vue";
  import CardTabs from "src/components/shared/CardTabs.vue";
  import CardTab from "src/components/shared/CardTab.vue";

  const props = defineProps({ customerId: String, title: String });

  const tab = ref("received");
  const activeTab = ref("received");

  const receiptFilter = [
    {
      fieldName: "d.TypeId",
      operator: sqlOperator.equal,
      value: documentType.receipt,
    },
  ];

  const payedFilter = [
    {
      fieldName: "d.TypeId",
      operator: sqlOperator.equal,
      value: documentType.payment,
    },
  ];

  if (props.customerId) {
    const customerFilter = {
      fieldName: "p.CustomerId",
      operator: sqlOperator.equal,
      value: props.customerId,
    };

    payedFilter.push(customerFilter);
    receiptFilter.push(customerFilter);
  }
</script>
