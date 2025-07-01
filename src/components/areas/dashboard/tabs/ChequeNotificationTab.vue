<template>
  <div
    v-access="`acc.report.accountReview`"
    class="row q-col-gutter-lg"
    :style="$q.screen.gt.sm ? 'padding-top: 38px' : 'padding-top: 0'"
  >
    <div class="col-12">
      <q-card bordered>
        <card-title
          :title="$t('dashboard.chequeNotificationTab.received')"
          icon="o_receipt"
        />
        <check-data-grid :filter-expression="receiptFilter" />
      </q-card>
    </div>
    <div class="col-12">
      <q-card bordered>
        <card-title
          :title="$t('dashboard.chequeNotificationTab.payed')"
          icon="o_payment"
        />
        <check-data-grid :filter-expression="payedFilter" />
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import {
    sqlOperator,
    documentType,
    paymentStatus,
  } from "src/constants";

  import CheckDataGrid from "src/components/areas/trs/report/desktop/_CheckItemDataGrid.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const receiptFilter = [
    {
      fieldName: "d.TypeId",
      operator: sqlOperator.equal,
      value: documentType.receipt,
    },
    {
      fieldName: "pi.StatusId",
      operator: sqlOperator.in,
      value: `${paymentStatus.normal},${paymentStatus.transferedToBank}`,
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
      value: `${paymentStatus.normal},${paymentStatus.transferedToBank}`,
    },
  ];
</script>
