<template>
  <!-- <toolbar-desktop margin :title="title" /> -->

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

<script setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { sqlOperator, documentType } from "src/constants";

  import DataGrid from "../desktop/_CheckItemDataGrid.vue";
  import CardTabs from "src/components/shared/CardTabs.vue";
  import CardTab from "src/components/shared/CardTab.vue";

  const { t } = useI18n();

  const props = defineProps({ customerId: String, title: String });

  const tab = ref("received");

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
