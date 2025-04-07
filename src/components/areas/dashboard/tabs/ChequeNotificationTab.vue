<template>
  <q-toolbar v-if="$q.screen.gt.sm" class="no-padding">
    <div class="row items-center q-py-lg">
      <div class="q-ml-sm text-h6 text-weight-700 text-on-dark">
        اعلان چک
      </div>
    </div>
  </q-toolbar>

  <div class="row q-col-gutter-lg">
    <div class="col-md-12">
      <q-card bordered>
        <card-title title="چک‌های دریافتی" icon="o_receipt" />
        <cheque-notif-grid :filter-expression="receiptFilter" />
      </q-card>
    </div>
    <div class="col-md-12">
      <q-card bordered>
        <card-title title="چک‌های پرداختی" icon="o_payment" />
        <cheque-notif-grid :filter-expression="payedFilter" />
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import { sqlOperator, documentType } from "src/constants";

  import ChequeNotifGrid from "./ChequeNotifGrid.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    customerId: String,
  });

  const receiptFilter = [
    {
      fieldName: "d.TypeId",
      operator: sqlOperator.equal,
      value: documentType.receipt,
    },
    {
      fieldName: "pi.StatusId",
      operator: sqlOperator.in,
      value: "1081,1082",
    },
  ];

  const payedFilter = [
    {
      fieldName: "d.TypeId",
      operator: sqlOperator.equal,
      value: documentType.payment,
    },
    {
      fieldName: "pi.StatusId",
      operator: sqlOperator.in,
      value: "1081,1082",
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
