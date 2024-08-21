<template>
  <q-tabs
    v-model="tab"
    class="primary-tabs q-mt-md_"
    :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
    :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
    narrow-indicator
    align="left"
    inline-label
  >
    <q-tab
      name="received"
      class="q-mr-xs text-h6 text-weight-700"
      label="چکهای دریافتی"
      icon="arrow_downward"
    />
    <q-tab
      name="payed"
      class="text-h6 text-weight-700"
      label="چکهای پرداختی"
      icon="arrow_upward"
    />
  </q-tabs>

  <q-separator size="1px" />

  <q-tab-panels
    v-model="tab"
    animated
    keep-alive
    class="q-mt-md transparent"
  >
    <q-tab-panel name="received">
      <data-grid :filter-expression="receiveFilter" toolbar />
    </q-tab-panel>
    <q-tab-panel name="payed">
      <data-grid :filter-expression="payedFilter" toolbar />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
  import { ref } from "vue";
  import { sqlOperator, documentType } from "src/constants";

  import DataGrid from "../desktop/_CheckItemDataGrid.vue";

  const props = defineProps({ customerId: String });

  const dataGrid = ref(null);
  const tab = ref("received");

  const receiveFilter = [
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
    receiveFilter.push(customerFilter);
  }
</script>
