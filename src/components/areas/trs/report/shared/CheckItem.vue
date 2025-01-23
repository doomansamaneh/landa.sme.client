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
        title="چکهای دریافتی"
      />
      <card-tab
        name="payed"
        icon="o_arrow_upward"
        title="چکهای پرداختی"
      />
    </card-tabs>

    <data-grid
      v-if="tab === 'received'"
      :filter-expression="receiptFilter"
      :no-fullscreen
      title="چکهای دریافتی"
    />
    <data-grid
      v-else
      :filter-expression="payedFilter"
      :no-fullscreen
      title="چکهای پرداختی"
    />
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { sqlOperator, documentType } from "src/constants";

  import DataGrid from "../desktop/_CheckItemDataGrid.vue";
  import CardTabs from "src/components/shared/CardTabs.vue";
  import CardTab from "src/components/shared/CardTab.vue";

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
